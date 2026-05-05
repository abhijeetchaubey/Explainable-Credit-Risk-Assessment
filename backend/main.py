import os
os.environ["OPENBLAS_NUM_THREADS"] = "1"
os.environ["OMP_NUM_THREADS"] = "1"

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import warnings
from dotenv import load_dotenv
from google import genai
# import google.generativeai as genai

# ✅ LIME
# from lime.lime_tabular import LimeTabularExplainer
import shap
# Rate limiting
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from fastapi import Request

warnings.filterwarnings("ignore", category=UserWarning)

load_dotenv()

# ------------------ Gemini Setup ------------------
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")


client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

# ------------------ App Setup ------------------
app = FastAPI(title="Explainable Credit Risk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Rate Limiter ------------------
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests. Please slow down."},
    )

# ------------------ Globals ------------------
model = None
scaler = None
explainer = None

# ------------------ Startup ------------------
@app.on_event("startup")
def load_models():
    global model, scaler, explainer

    try:
        model = joblib.load("model/best_loan_approval_model.joblib")
        scaler = joblib.load("model/scaler.joblib")

        def predict_fn(x):
            return model.predict_proba(x)[:, 1]

        background = np.zeros((10, 12))
        explainer = shap.KernelExplainer(predict_fn, background)
        

        print("Models + SHAP loaded successfully.")

    except Exception as e:
        print(f"Error loading models: {e}")

# ------------------ Schemas ------------------
class FrontendApplication(BaseModel):
    name: str
    no_of_dependents: float
    education: float
    self_employed: float
    income_annum: float
    loan_amount: float
    loan_term: float
    cibil_score: float
    residential_assets_value: float
    commercial_assets_value: float
    luxury_assets_value: float
    bank_asset_value: float


class PredictionResponse(BaseModel):
    decision: str
    risk_score: int
    explanation: str
    key_factors: list[str]


class ChatMessage(BaseModel):
    message: str
    context: dict


class ChatResponse(BaseModel):
    response: str

@app.get("/")
def root():
    return "Backend is live"

# ------------------ API ------------------
@app.post("/api/assess_risk", response_model=PredictionResponse)
@limiter.limit("10/minute")
def assess_risk(request: Request, application: FrontendApplication):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Models not loaded")

    try:
        features_order = [
            'no_of_dependents', 'education', 'self_employed', 'income_annum',
            'loan_amount', 'loan_term', 'cibil_score', 'residential_assets_value',
            'commercial_assets_value', 'luxury_assets_value', 'bank_asset_value'
        ]

        input_data = pd.DataFrame([{
            'no_of_dependents': application.no_of_dependents,
            'education': application.education,
            'self_employed': application.self_employed,
            'income_annum': application.income_annum,
            'loan_amount': application.loan_amount,
            'loan_term': application.loan_term,
            'cibil_score': application.cibil_score,
            'residential_assets_value': application.residential_assets_value,
            'commercial_assets_value': application.commercial_assets_value,
            'luxury_assets_value': application.luxury_assets_value,
            'bank_asset_value': application.bank_asset_value
        }], columns=features_order)

        # Scale
        input_scaled = scaler.transform(input_data)

        # Match 12 features (same as your model)
        input_scaled_12 = np.zeros((1, 12))
        input_scaled_12[0, :11] = input_scaled[0]

        # Prediction
        prediction_val = model.predict(input_scaled_12)[0]

        try:
            probability = model.predict_proba(input_scaled_12)[0][1]
        except:
            probability = float(prediction_val)

        prediction_str = "Approved" if prediction_val == 1 else "Rejected"
        risk_score = int(probability * 100)

        # ------------------ SHAP ------------------
        # Compute SHAP values for the 12-feature scaled input using KernelExplainer
        shap_vals = explainer.shap_values(input_scaled_12, nsamples=100)
        # Extract values for the single sample, taking only the 11 actual features
        values = shap_vals[0][:11]

        # Pair feature with importance
        feature_importance = list(zip(features_order, values))

        # Sort by absolute impact
        feature_importance.sort(key=lambda x: abs(x[1]), reverse=True)

        # Top factors
        top_features = feature_importance[:5]

        key_factors = []
        for name, val in top_features:
            actual_val = input_data[name].iloc[0]
            impact_pct = abs(int(val * 100))
            if impact_pct == 0:
                impact_pct = 1
            impact = f"increased approval chance by ~{impact_pct}%" if val > 0 else f"decreased approval chance by ~{impact_pct}%"
            clean_name = name.replace('_', ' ').title()
            key_factors.append(f"{clean_name} ({actual_val}) {impact}")

        if not key_factors:
            key_factors = ["Credit Score", "Annual Income"]

        # ------------------ Gemini ------------------
        if client:
            prompt = f"""
            Loan Decision: {prediction_str}
            Risk Score: {risk_score}/100
            Key Factors: {', '.join(key_factors)}

            Explain in 2 short sentences.
            """

            try:
                response = client.models.generate_content(
                    model="gemma-4-26b-a4b-it",
                    contents=prompt,
                )
                explanation_text = response.text.strip()

            except Exception as e:
                print("Gemini error:", e)
                explanation_text = fallback_explanation(
                    prediction_str, risk_score, key_factors
                )
        else:
            explanation_text = fallback_explanation(
                prediction_str, risk_score, key_factors
            )

        return PredictionResponse(
            decision=prediction_str,
            risk_score=risk_score,
            explanation=explanation_text,
            key_factors=key_factors
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


# ------------------ Chat API ------------------
@app.post("/api/chat", response_model=ChatResponse)
@limiter.limit("20/minute")
def chat_with_ai(request: Request, chat_req: ChatMessage):

    decision = chat_req.context.get("decision", "Unknown")
    factors = chat_req.context.get("key_factors", [])

    if client:
        prompt = f"""
        You are an Explainable Credit risk assessment system. Answer questions only related to credits and loans. If asked something out of scope reply i cant help with that in a formal way.
        Loan Decision: {decision}
        Factors: {', '.join(factors)}

        IMPORTANT: If the user asks what specific numerical value a factor should be to get approved, DO NOT say you cannot provide a number. Instead, provide a reasonable mathematical estimate (for example, suggesting a 2x to 5x increase, or a logical target) based on standard banking principles and the impact percentage of the factor. Give a specific estimated number or range.
        
        User: {chat_req.message}
        Answer clearly and briefly.
        """

        try:
            response = client.models.generate_content(
                contents=prompt,
                model="gemma-4-26b-a4b-it",
                # request_options={"timeout": 10}
            )
            return ChatResponse(response=response.text.strip())

        except Exception as e:
            import traceback
            print(" GEMINI FULL ERROR:")
            traceback.print_exc()
            return ChatResponse(
                response="Unable to process request right now."
            )

    return ChatResponse(
        response=f"Loan was {decision} due to {', '.join(factors)}."
    )


# ------------------ Fallback ------------------
def fallback_explanation(prediction_str, risk_score, key_factors):
    text = f"Your risk score is {risk_score}/100. "
    text += f"The decision was {prediction_str.lower()} mainly due to "
    text += ", ".join(key_factors) + "."
    return text


# ------------------ Health ------------------
@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "lime_loaded": explainer is not None
    }
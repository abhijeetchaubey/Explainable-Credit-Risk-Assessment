import joblib
import shap
import numpy as np
import pandas as pd

model = joblib.load('model/best_loan_approval_model.joblib')
scaler = joblib.load('model/scaler.joblib')

payload = {
    "no_of_dependents": 2.0,
    "education": 1.0,
    "self_employed": 0.0,
    "income_annum": 500000.0,
    "loan_amount": 1000000.0,
    "loan_term": 10.0,
    "cibil_score": 850.0,
    "residential_assets_value": 200000.0,
    "commercial_assets_value": 0.0,
    "luxury_assets_value": 100000.0,
    "bank_asset_value": 50000.0
}

features_order = [
    'no_of_dependents', 'education', 'self_employed', 'income_annum',
    'loan_amount', 'loan_term', 'cibil_score', 'residential_assets_value',
    'commercial_assets_value', 'luxury_assets_value', 'bank_asset_value'
]

input_data = pd.DataFrame([payload], columns=features_order)
input_scaled = scaler.transform(input_data)
input_scaled_12 = np.zeros((1, 12))
input_scaled_12[0, :11] = input_scaled[0]

print("Scaled input for CIBIL:", input_scaled[0][6])

def predict_fn(x):
    return model.predict_proba(x)[:, 1]

background = np.zeros((10, 12))
explainer = shap.KernelExplainer(predict_fn, background)
shap_vals = explainer.shap_values(input_scaled_12, nsamples=100)

values = shap_vals[0][:11]

feature_importance = list(zip(features_order, values))
feature_importance.sort(key=lambda x: abs(x[1]), reverse=True)

for name, val in feature_importance:
    print(f"{name}: {val}")

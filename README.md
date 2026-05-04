# Explainable Credit Risk Assessment System

## Objective

This project aims to build an **AI-powered, explainable credit risk assessment system** that automates loan approval decisions while providing transparent, human-understandable explanations for those decisions. The system combines machine learning predictions with explainable AI (XAI) techniques and conversational AI to create a trustworthy lending decision support tool.

### Key Goals:
- **Automate loan assessment**: Use machine learning to predict loan approval decisions
- **Explain predictions**: Provide clear, feature-level explanations using SHAP (SHapley Additive exPlanations)
- **Natural language explanations**: Generate human-readable explanations via Google Gemini AI
- **Interactive exploration**: Allow users to ask follow-up questions about assessment results via chatbot
- **Build trust**: Ensure transparency in decision-making for lending institutions

---

## Project Structure

```
Explainable-Credit-Risk-Assessment/
├── backend/                              # Python FastAPI backend
│   ├── main.py                          # Main API application
│   ├── requirements.txt                 # Python dependencies
│   ├── model/
│   │   ├── best_loan_approval_model.joblib    # Trained ML model
│   │   └── scaler.joblib                      # Feature scaler
│   ├── inspect_model.py                 # Model inspection utilities
│   ├── inspect_model_features.py       # Feature analysis
│   ├── inspect_rf.py                   # Random Forest analysis
│   ├── test_api.py                     # API testing
│   ├── test_shap.py                    # SHAP explanation testing
│   └── test_12th_feature.py            # Feature dimension testing
│
└── frontend/                             # React + Vite frontend
    ├── index.html                       # Main HTML entry point
    ├── package.json                     # NPM dependencies
    ├── vite.config.js                   # Vite bundler configuration
    ├── tailwind.config.js              # Tailwind CSS configuration
    ├── postcss.config.js               # PostCSS configuration
    ├── src/
    │   ├── main.jsx                    # React app entry
    │   ├── App.jsx                     # Main app component
    │   ├── index.css                   # Global styles
    │   ├── api.js                      # API client utilities
    │   ├── components/                 # Reusable React components
    │   │   ├── LoanForm.jsx           # Application form component
    │   │   ├── ResultCard.jsx         # Results display component
    │   │   ├── ExplanationBox.jsx     # Explanation display
    │   │   └── Chatbot.jsx            # Interactive chatbot
    │   └── pages/                      # Page components
    │       ├── WelcomePage.jsx        # Landing page
    │       ├── FormPage.jsx           # Application form page
    │       └── ResultPage.jsx         # Results and chatbot page
    └── components.json                # UI components registry
```

---

## Features Implemented

### 1. **Machine Learning Model**
- **Algorithm**: Random Forest Classifier
- **Purpose**: Predicts loan approval decisions (Approved/Rejected)
- **Input Features**: 11 financial and demographic features
- **Output**: Binary classification (1 = Approved, 0 = Rejected) + approval probability

### 2. **Feature Importance Explanation (SHAP)**
- **Technology**: SHAP (SHapley Additive exPlanations)
- **Implementation**: KernelExplainer for model-agnostic explanations
- **Output**: 
  - Individual feature contributions to the prediction
  - Top 5 factors influencing the decision
  - Direction of impact (increased/decreased approval chance)
  - Quantified impact percentage

### 3. **Natural Language Explanations (Gemini AI)**
- **Integration**: Google Gemini API (gemini-3-flash model)
- **Purpose**: Convert technical explanations into human-readable text
- **Output**: 2-sentence natural language explanation of the decision

### 4. **Interactive Chatbot**
- **Technology**: Google Gemini AI
- **Scope**: Answers questions specifically about credit and loan decisions
- **Features**: Context-aware responses using decision and key factors
- **Rate limiting**: 20 requests per minute

### 5. **Backend API (FastAPI)**

#### Endpoints:

**POST `/api/assess_risk`**
- **Description**: Assess a loan application and return decision + explanation
- **Rate Limit**: 10 requests/minute
- **Input**: Applicant information (name, income, loan amount, credit score, assets, etc.)
- **Output**: 
  ```json
  {
    "decision": "Approved/Rejected",
    "risk_score": 0-100,
    "explanation": "Natural language explanation",
    "key_factors": ["List of top 5 factors"]
  }
  ```

**POST `/api/chat`**
- **Description**: Interactive Q&A about assessment results
- **Rate Limit**: 20 requests/minute
- **Input**: Chat message + assessment context
- **Output**: AI-generated response

### 6. **Frontend Application (React + Vite)**

#### Pages:

1. **Welcome Page** (`WelcomePage.jsx`)
   - Landing page with project overview
   - Navigation to loan application form

2. **Application Form Page** (`FormPage.jsx`)
   - User-friendly form for applicant information
   - Collects 11 financial and demographic features
   - Form validation
   - Real-time assessment with loading states
   - Error handling

3. **Results Page** (`ResultPage.jsx`)
   - Displays loan decision (Approved/Rejected)
   - Shows risk score (0-100)
   - Displays AI-generated explanation
   - Lists top 5 factors influencing decision
   - Interactive chatbot for follow-up questions

#### Components:

- **LoanForm.jsx**: Reusable form component for loan applications
- **ResultCard.jsx**: Displays assessment results with visual feedback
- **ExplanationBox.jsx**: Shows SHAP-derived and AI-generated explanations
- **Chatbot.jsx**: Interactive chat interface for Q&A

### 7. **Application Features**

- **12 Input Features**:
  1. Name
  2. Number of Dependents
  3. Education Level (encoded)
  4. Self-Employed Status
  5. Annual Income
  6. Loan Amount
  7. Loan Term
  8. CIBIL Score (Credit Score)
  9. Residential Assets Value
  10. Commercial Assets Value
  11. Luxury Assets Value
  12. Bank Assets Value

- **Rate Limiting**: Prevents abuse with configurable request limits
- **CORS Support**: Enables cross-origin requests for frontend-backend communication
- **Error Handling**: Comprehensive error handling with meaningful messages
- **Environment Configuration**: Secure API key management via `.env` file

---

## Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Machine Learning**: scikit-learn (Random Forest)
- **Explainability**: SHAP (SHapley Additive exPlanations)
- **AI Integration**: Google Generative AI (Gemini)
- **Rate Limiting**: slowapi
- **Serialization**: joblib
- **CORS**: fastapi middleware

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 5.1
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6.22
- **HTTP Client**: Axios 1.6
- **Icons**: Lucide React 0.330
- **UI Components**: Radix UI

---

## Setup & Installation

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn
- Google Gemini API key

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file** with your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

5. **Run the backend server**:
   ```bash
   python main.py
   ```
   The API will start at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   The application will start at `http://localhost:5173`

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## API Usage Examples

### Assess Loan Application

```bash
curl -X POST "http://localhost:8000/api/assess_risk" \
  -H "Content-Type: application/json" \
  -d {
    "name": "John Doe",
    "no_of_dependents": 2,
    "education": 1,
    "self_employed": 0,
    "income_annum": 500000,
    "loan_amount": 250000,
    "loan_term": 60,
    "cibil_score": 750,
    "residential_assets_value": 1000000,
    "commercial_assets_value": 500000,
    "luxury_assets_value": 200000,
    "bank_asset_value": 100000
  }
```

### Chat with AI

```bash
curl -X POST "http://localhost:8000/api/chat" \
  -H "Content-Type: application/json" \
  -d {
    "message": "Why was my application approved?",
    "context": {
      "decision": "Approved",
      "key_factors": ["High CIBIL Score", "Good Income", "Sufficient Assets"]
    }
  }
```

---

## How It Works

### Workflow

1. **User Input**: Applicant fills out the loan application form on the frontend
2. **Feature Extraction**: Frontend collects 11 applicant features
3. **Prediction**: Backend's Random Forest model predicts approval decision
4. **SHAP Explanation**: KernelExplainer computes feature importance scores
5. **AI Summary**: Gemini generates human-readable explanation
6. **Display Results**: Results page shows decision, score, explanation, and key factors
7. **Interactive Q&A**: User can ask follow-up questions via chatbot
8. **Chat Response**: Gemini provides context-aware answers

### Explainability Pipeline

```
User Input
    ↓
Feature Scaling (StandardScaler)
    ↓
ML Prediction (Random Forest)
    ↓
SHAP Feature Importance Analysis
    ↓
Top 5 Factors Extraction
    ↓
Gemini AI Summary Generation
    ↓
Display to User
    ↓
Interactive Chatbot for Q&A
```

---

## Testing

### Backend Tests

- **`test_api.py`**: Tests API endpoints and integration
- **`test_shap.py`**: Validates SHAP explanation generation
- **`test_12th_feature.py`**: Tests feature dimension handling
- **`inspect_model.py`**: Inspects model structure and performance
- **`inspect_model_features.py`**: Analyzes feature characteristics
- **`inspect_rf.py`**: Inspects Random Forest specifics

Run tests:
```bash
cd backend
python test_api.py
python test_shap.py
```

---

## Configuration

### Environment Variables (`.env`)

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Rate Limiting

- **`/api/assess_risk`**: 10 requests per minute per IP
- **`/api/chat`**: 20 requests per minute per IP

Modify in `backend/main.py`:
```python
@app.post("/api/assess_risk")
@limiter.limit("10/minute")
```

---

## Key Technologies & Methodologies

### Explainable AI (XAI)
- **SHAP (SHapley Additive exPlanations)**: Provides game-theoretic approach to feature importance
- **KernelExplainer**: Model-agnostic explanation method

### Machine Learning
- **Random Forest**: Ensemble learning for robust predictions
- **Feature Scaling**: StandardScaler for normalized inputs
- **Feature Engineering**: 11-dimensional feature space

### API Design
- **FastAPI**: Modern, fast web framework with automatic OpenAPI docs
- **Rate Limiting**: Prevents abuse and ensures fair usage
- **CORS Middleware**: Enables secure cross-origin communication

### Frontend Best Practices
- **Component-based Architecture**: Reusable, maintainable components
- **State Management**: React hooks for efficient state handling
- **Responsive Design**: Tailwind CSS for mobile-first approach
- **Error Handling**: User-friendly error messages and loading states

---

## Future Enhancements

1. **Model Improvements**:
   - Implement ensemble models (XGBoost, LightGBM)
   - Add explainability for model uncertainty
   - Support multi-class predictions (Approved, Rejected, On-Hold)

2. **Feature Enhancements**:
   - Document upload and verification
   - Applicant profile history tracking
   - Custom rule engine for business logic

3. **Analytics & Monitoring**:
   - Application decision analytics dashboard
   - Model performance monitoring
   - User behavior analytics

4. **Security**:
   - User authentication and authorization
   - Encrypted data storage
   - Audit logging for regulatory compliance

5. **Scalability**:
   - Database integration for persistent storage
   - Caching layer for performance
   - Model versioning and A/B testing

---

## Contributing

1. Create a new branch for your feature
2. Make changes and test thoroughly
3. Submit a pull request with detailed description

---

## License

This project is provided as-is for educational and research purposes.

---

## Support

For issues, questions, or contributions, please refer to the project documentation or contact the development team.

---

## Acknowledgments

- **SHAP**: For providing explainability to machine learning models
- **FastAPI**: For modern API framework
- **React**: For interactive frontend development
- **Google Generative AI**: For Gemini AI integration
- **Scikit-learn**: For machine learning capabilities

import joblib
import pandas as pd

try:
    model = joblib.load('model/best_loan_approval_model.joblib')
    print("Model loaded successfully")
    print("Model type:", type(model))
    if hasattr(model, 'feature_names_in_'):
        print("Feature names:", model.feature_names_in_)
    else:
        print("No feature_names_in_ attribute found.")
except Exception as e:
    print(f"Error loading model: {e}")

try:
    scaler = joblib.load('model/scaler.joblib')
    print("Scaler loaded successfully")
    print("Scaler type:", type(scaler))
    if hasattr(scaler, 'feature_names_in_'):
        print("Scaler feature names:", scaler.feature_names_in_)
except Exception as e:
    print(f"Error loading scaler: {e}")

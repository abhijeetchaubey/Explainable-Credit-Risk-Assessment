import joblib
import pandas as pd

try:
    model = joblib.load('model/best_loan_approval_model.joblib')
    rf = model.estimators_[0]
    print(f"RandomForest expects {rf.n_features_in_} features.")
    print(f"Let's see if we can find out what they are.")
    if hasattr(rf, 'feature_names_in_'):
        print(f"RF features: {rf.feature_names_in_}")
    
    # Check the scaler's n_features_in_ just to be sure
    scaler = joblib.load('model/scaler.joblib')
    print(f"Scaler expects {scaler.n_features_in_} features.")
    print(f"Scaler features: {scaler.feature_names_in_}")

except Exception as e:
    print(f"Error: {e}")

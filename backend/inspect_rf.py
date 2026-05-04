import joblib
import pandas as pd
import numpy as np

try:
    model = joblib.load('model/best_loan_approval_model.joblib')
    rf = model.estimators_[0]
    
    importances = rf.feature_importances_
    print(f"Feature importances ({len(importances)}):")
    for i, imp in enumerate(importances):
        print(f"Feature {i}: {imp:.4f}")
        
except Exception as e:
    print(f"Error: {e}")

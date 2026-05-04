import joblib
import numpy as np

model = joblib.load('model/best_loan_approval_model.joblib')

# Create a dummy row with 12 features
x_0 = np.zeros((1, 12))
x_0[0, 11] = 0

x_1 = np.zeros((1, 12))
x_1[0, 11] = 1

print("Prediction with feature 11 = 0:", model.predict(x_0))
print("Prediction with feature 11 = 1:", model.predict(x_1))

# Let's also check proba
try:
    print("Proba with 0:", model.predict_proba(x_0))
    print("Proba with 1:", model.predict_proba(x_1))
except:
    pass

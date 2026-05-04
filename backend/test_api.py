import urllib.request
import json

url = "http://127.0.0.1:8000/api/assess_risk"

payload = {
    "name": "Test User",
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

data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.getcode()}")
        print(json.dumps(json.loads(response.read().decode('utf-8')), indent=2))
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")

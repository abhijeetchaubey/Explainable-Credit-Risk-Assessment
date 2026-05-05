// Mock data sets for testing the credit risk assessment
export const mockDataSets = {
  lowRisk: {
    name: 'Abhijeet Chaubey',
    no_of_dependents: '2',
    education: '1',
    self_employed: '0',
    income_annum: '950000',
    loan_amount: '2500000',
    loan_term: '12',
    cibil_score: '850',
    residential_assets_value: '2500000',
    commercial_assets_value: '0',
    luxury_assets_value: '50000',
    bank_asset_value: '100000'
  },
  mediumRisk: {
    name: 'Mike Chen',
    no_of_dependents: '1',
    education: '0',
    self_employed: '1',
    income_annum: '55000',
    loan_amount: '45000',
    loan_term: '24',
    cibil_score: '650',
    residential_assets_value: '120000',
    commercial_assets_value: '75000',
    luxury_assets_value: '8000',
    bank_asset_value: '12000'
  },
  highRisk: {
    name: 'James Williams',
    no_of_dependents: '4',
    education: '0',
    self_employed: '1',
    income_annum: '32000',
    loan_amount: '80000',
    loan_term: '36',
    cibil_score: '520',
    residential_assets_value: '45000',
    commercial_assets_value: '0',
    luxury_assets_value: '2000',
    bank_asset_value: '3000'
  },
  borderline: {
    name: 'Emma Davis',
    no_of_dependents: '0',
    education: '1',
    self_employed: '0',
    income_annum: '65000',
    loan_amount: '35000',
    loan_term: '18',
    cibil_score: '680',
    residential_assets_value: '180000',
    commercial_assets_value: '25000',
    luxury_assets_value: '12000',
    bank_asset_value: '22000'
  },
  highEarner: {
    name: 'Robert Anderson',
    no_of_dependents: '3',
    education: '1',
    self_employed: '0',
    income_annum: '150000',
    loan_amount: '50000',
    loan_term: '10',
    cibil_score: '820',
    residential_assets_value: '450000',
    commercial_assets_value: '200000',
    luxury_assets_value: '35000',
    bank_asset_value: '75000'
  }
};

export const mockDataLabels = {
  lowRisk: 'Low Risk (Good Profile)',
  mediumRisk: 'Medium Risk (Mixed Profile)',
  highRisk: 'High Risk (Challenging Profile)',
  borderline: 'Borderline (Critical Score)',
  highEarner: 'High Earner (Strong Profile)'
};

export const getMockData = (key) => {
  return mockDataSets[key] || null;
};

export const getAllMockData = () => {
  return mockDataSets;
};

export const getAllMockDataLabels = () => {
  return mockDataLabels;
};

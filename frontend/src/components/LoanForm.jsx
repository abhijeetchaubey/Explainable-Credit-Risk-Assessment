import React, { useState } from 'react';
import { Loader2, DownloadCloud } from 'lucide-react';
import { mockDataSets, mockDataLabels } from '../lib/mockData';

export default function LoanForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    no_of_dependents: '',
    education: '1',
    self_employed: '0',
    income_annum: '',
    loan_amount: '',
    loan_term: '',
    cibil_score: '',
    residential_assets_value: '',
    commercial_assets_value: '',
    luxury_assets_value: '',
    bank_asset_value: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      name: formData.name,
      no_of_dependents: parseFloat(formData.no_of_dependents),
      education: parseFloat(formData.education),
      self_employed: parseFloat(formData.self_employed),
      income_annum: parseFloat(formData.income_annum),
      loan_amount: parseFloat(formData.loan_amount),
      loan_term: parseFloat(formData.loan_term),
      cibil_score: parseFloat(formData.cibil_score),
      residential_assets_value: parseFloat(formData.residential_assets_value),
      commercial_assets_value: parseFloat(formData.commercial_assets_value),
      luxury_assets_value: parseFloat(formData.luxury_assets_value),
      bank_asset_value: parseFloat(formData.bank_asset_value)
    };
    onSubmit(processedData);
  };

  const handleLoadMockData = (key) => {
    const mockData = mockDataSets[key];
    if (mockData) {
      setFormData(mockData);
    }
  };

  const inputClass = "flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200";
  const labelClass = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-muted-foreground";

  return (
    <div className="glass rounded-xl p-8 w-full max-w-4xl mx-auto border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Applicant Details</h2>
        <p className="text-sm text-muted-foreground mt-2">Enter your information for AI-driven risk assessment.</p>
      </div>

      {/* Mock Data Loader */}
      <div className="mb-8 p-4 rounded-lg border border-white/10 bg-white/5 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <DownloadCloud className="h-4 w-4 text-primary" />
          <label className="text-sm font-semibold text-foreground">Load Test Data (Optional)</label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          {Object.entries(mockDataLabels).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleLoadMockData(key)}
              className="px-3 py-2 text-xs font-medium rounded-md bg-white/10 hover:bg-white/20 text-foreground transition-colors duration-200 border border-white/10 hover:border-white/20"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className={labelClass}>Full Name</label>
            <input required id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="no_of_dependents" className={labelClass}>No of Dependents</label>
            <input required id="no_of_dependents" name="no_of_dependents" type="number" min="0" value={formData.no_of_dependents} onChange={handleChange} className={inputClass} placeholder="2" />
          </div>
          <div className="space-y-2">
            <label htmlFor="education" className={labelClass}>Education</label>
            <select required id="education" name="education" value={formData.education} onChange={handleChange} className={inputClass}>
              <option value="1">Graduate</option>
              <option value="0">Not Graduate</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="self_employed" className={labelClass}>Self Employed</label>
            <select required id="self_employed" name="self_employed" value={formData.self_employed} onChange={handleChange} className={inputClass}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="income_annum" className={labelClass}>Annual Income ($)</label>
            <input required id="income_annum" name="income_annum" type="number" min="0" value={formData.income_annum} onChange={handleChange} className={inputClass} placeholder="75000" />
          </div>
          <div className="space-y-2">
            <label htmlFor="loan_amount" className={labelClass}>Loan Amount ($)</label>
            <input required id="loan_amount" name="loan_amount" type="number" min="100" value={formData.loan_amount} onChange={handleChange} className={inputClass} placeholder="25000" />
          </div>
          <div className="space-y-2">
            <label htmlFor="loan_term" className={labelClass}>Loan Term (Years/Months)</label>
            <input required id="loan_term" name="loan_term" type="number" min="1" value={formData.loan_term} onChange={handleChange} className={inputClass} placeholder="12" />
          </div>
          <div className="space-y-2">
            <label htmlFor="cibil_score" className={labelClass}>CIBIL Score</label>
            <input required id="cibil_score" name="cibil_score" type="number" min="300" max="900" value={formData.cibil_score} onChange={handleChange} className={inputClass} placeholder="720" />
          </div>
          <div className="space-y-2">
            <label htmlFor="residential_assets_value" className={labelClass}>Residential Assets ($)</label>
            <input required id="residential_assets_value" name="residential_assets_value" type="number" min="0" value={formData.residential_assets_value} onChange={handleChange} className={inputClass} placeholder="100000" />
          </div>
          <div className="space-y-2">
            <label htmlFor="commercial_assets_value" className={labelClass}>Commercial Assets ($)</label>
            <input required id="commercial_assets_value" name="commercial_assets_value" type="number" min="0" value={formData.commercial_assets_value} onChange={handleChange} className={inputClass} placeholder="0" />
          </div>
          <div className="space-y-2">
            <label htmlFor="luxury_assets_value" className={labelClass}>Luxury Assets ($)</label>
            <input required id="luxury_assets_value" name="luxury_assets_value" type="number" min="0" value={formData.luxury_assets_value} onChange={handleChange} className={inputClass} placeholder="15000" />
          </div>
          <div className="space-y-2">
            <label htmlFor="bank_asset_value" className={labelClass}>Bank Asset Value ($)</label>
            <input required id="bank_asset_value" name="bank_asset_value" type="number" min="0" value={formData.bank_asset_value} onChange={handleChange} className={inputClass} placeholder="5000" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 shadow-lg shadow-primary/25 mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing with AI...
            </>
          ) : (
            "Assess Credit Risk"
          )}
        </button>
      </form>
    </div>
  );
}

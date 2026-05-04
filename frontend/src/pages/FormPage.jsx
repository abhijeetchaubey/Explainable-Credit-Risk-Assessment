import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoanForm from '../components/LoanForm';
import { assessRisk } from '../api';
import { ArrowLeft } from 'lucide-react';

export default function FormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAssessment = async (applicationData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const assessmentResult = await assessRisk(applicationData);
      // Navigate to the result page, passing the data through router state
      navigate('/result', { state: { result: assessmentResult } });
    } catch (err) {
      setError("Failed to connect to the AI engine. Please ensure the backend server is running.");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Application Details
          </h1>
          <p className="text-muted-foreground">
            Please provide the applicant's information to generate an AI assessment.
          </p>
        </div>

        <LoanForm onSubmit={handleAssessment} isLoading={isLoading} />
        
        {error && (
          <div className="glass rounded-xl p-4 w-full max-w-2xl mx-auto border-destructive/50 bg-destructive/10 text-destructive text-center animate-in fade-in">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

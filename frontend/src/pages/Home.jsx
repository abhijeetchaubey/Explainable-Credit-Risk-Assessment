import React, { useState } from 'react';
import LoanForm from '../components/LoanForm';
import ResultCard from '../components/ResultCard';
import ExplanationBox from '../components/ExplanationBox';
import { assessRisk } from '../api';
import { ShieldAlert } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAssessment = async (applicationData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const assessmentResult = await assessRisk(applicationData);
      setResult(assessmentResult);
    } catch (err) {
      setError("Failed to connect to the AI engine. Please ensure the backend server is running.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4 shadow-sm backdrop-blur-md">
            <ShieldAlert size={16} />
            <span>AI-Powered Analysis</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
            Explainable Credit Risk
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Leveraging advanced Machine Learning and Generative AI to provide transparent, unbiased, and instantaneous loan decisions.
          </p>
        </div>

        <LoanForm onSubmit={handleAssessment} isLoading={isLoading} />
        
        {error && (
          <div className="glass rounded-xl p-4 w-full max-w-2xl mx-auto border-destructive/50 bg-destructive/10 text-destructive text-center animate-in fade-in">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <ResultCard result={result} />
            <ExplanationBox result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

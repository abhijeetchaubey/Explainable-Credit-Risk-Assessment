import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import ExplanationBox from '../components/ExplanationBox';
import Chatbot from '../components/Chatbot';
import { RotateCcw } from 'lucide-react';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // The result data is passed via router state from FormPage
  const result = location.state?.result;

  useEffect(() => {
    // If someone manually navigates to /result without data, send them back to the form
    if (!result) {
      navigate('/form', { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null; // Will redirect shortly

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Assessment Results
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-generated risk analysis and detailed explanation.
            </p>
          </div>
          <button 
            onClick={() => navigate('/form')} 
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors text-sm font-medium border border-white/5 shadow-sm"
          >
            <RotateCcw size={16} />
            Start Over
          </button>
        </div>

        <div className="space-y-6">
          <ResultCard result={result} />
          <ExplanationBox result={result} />
          <Chatbot result={result} />
        </div>
      </div>
    </div>
  );
}

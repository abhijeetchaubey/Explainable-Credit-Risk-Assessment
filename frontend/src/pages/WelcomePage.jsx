import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Activity, Brain } from 'lucide-react';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative flex flex-col justify-center items-center">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 shadow-sm backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ShieldAlert size={18} />
          <span>Next-Generation Risk Intelligence</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-foreground drop-shadow-sm animate-in fade-in slide-in-from-bottom-6 duration-700">
          Explainable <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            Credit Risk
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          Leveraging advanced Machine Learning and Generative AI to provide transparent, unbiased, and instantaneous loan decisions that you can trust.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-12 text-left max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <div className="glass p-6 rounded-2xl border-white/5">
            <Brain className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Driven Decisions</h3>
            <p className="text-muted-foreground text-sm">Our ML models analyze multiple data points to deliver highly accurate risk scores in seconds.</p>
          </div>
          <div className="glass p-6 rounded-2xl border-white/5">
            <Activity className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Full Transparency</h3>
            <p className="text-muted-foreground text-sm">Generative AI explains exactly why a decision was made in plain, easy-to-understand language.</p>
          </div>
        </div>

        <button 
          onClick={() => navigate('/form')}
          className="group inline-flex items-center justify-center gap-2 rounded-full text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500"
        >
          Assess Risk Now
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const bootSteps = [
    'Initializing NidOS kernel...',
    'Loading system drivers...',
    'Mounting file systems...',
    'Starting system services...',
    'Configuring network interfaces...',
    'Loading user profile...',
    'Preparing desktop environment...'
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowProgress(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showProgress) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < bootSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onBootComplete, 1500);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [showProgress, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white">
      {/* BIOS-style header */}
      <div className="absolute top-8 left-8 text-sm font-mono text-gray-400">
        NidOS BIOS v2.1.0 - Build 20241128
      </div>

      {/* Main boot content */}
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8">
          NidOS
        </div>

        {showProgress && (
          <div className="space-y-6 w-96">
            {/* Progress indicator */}
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <div className="text-sm font-mono">
                {bootSteps[currentStep]}
              </div>
            </div>

            {/* Boot steps */}
            <div className="space-y-2">
              {bootSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 text-xs font-mono transition-all duration-300 ${
                    index < currentStep 
                      ? 'text-green-400' 
                      : index === currentStep 
                      ? 'text-primary' 
                      : 'text-gray-600'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : index === currentStep ? (
                    <div className="w-3 h-3 border border-primary rounded-full animate-pulse" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-600 rounded-full" />
                  )}
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / bootSteps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="absolute bottom-8 text-xs text-gray-500 font-mono text-center">
          Made with Lovable AI. It's also{' '}
          <a 
            href="https://github.com/apodimsoftware/nidos-ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            open source
          </a>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
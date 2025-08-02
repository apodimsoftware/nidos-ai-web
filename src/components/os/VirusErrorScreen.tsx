import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface VirusErrorScreenProps {
  onRestart: () => void;
}

const VirusErrorScreen = ({ onRestart }: VirusErrorScreenProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [showingErrors, setShowingErrors] = useState(true);

  const errorMessages = [
    "CRITICAL ERROR: System32 has been corrupted!",
    "WARNING: 47 viruses detected on your system!",
    "ERROR: Registry keys have been modified!",
    "ALERT: Your personal data is being transmitted!",
    "CRITICAL: Memory allocation failed!",
    "ERROR: Boot sector damaged!",
    "WARNING: Firewall has been disabled!",
    "CRITICAL: System files are missing!",
    "ERROR: Network security compromised!",
    "ALERT: Unauthorized access detected!",
    "WARNING: Hard drive failure imminent!",
    "ERROR: Operating system corrupted!",
    "CRITICAL: Security breach detected!",
    "WARNING: Identity theft in progress!",
    "ERROR: System will shutdown in 60 seconds!",
  ];

  useEffect(() => {
    let errorInterval: NodeJS.Timeout;
    
    if (showingErrors) {
      errorInterval = setInterval(() => {
        setErrors(prev => {
          const newError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
          const newErrors = [...prev, newError];
          return newErrors.slice(-8); // Keep only last 8 errors visible
        });
      }, 200);
    }

    // Stop showing errors and restart after 1 minute
    const restartTimeout = setTimeout(() => {
      setShowingErrors(false);
      setTimeout(onRestart, 2000);
    }, 10000);

    return () => {
      clearInterval(errorInterval);
      clearTimeout(restartTimeout);
    };
  }, [showingErrors, onRestart]);

  if (!showingErrors) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
        <div className="text-white text-center">
          <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>System Restarting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-red-900/90 z-[9999] overflow-hidden">
      {/* Multiple error windows */}
      {errors.map((error, index) => (
        <div
          key={index}
          className="absolute bg-red-600 border-2 border-red-800 rounded shadow-2xl animate-pulse"
          style={{
            left: `${Math.random() * 60 + 10}%`,
            top: `${Math.random() * 60 + 10}%`,
            width: '300px',
            zIndex: 1000 + index,
          }}
        >
          {/* Window header */}
          <div className="bg-red-700 px-3 py-1 flex items-center justify-between text-white text-sm">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              CRITICAL ERROR
            </div>
            <X className="w-4 h-4 cursor-pointer hover:bg-red-800 rounded" />
          </div>
          
          {/* Window content */}
          <div className="p-4 text-white">
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mr-3 animate-bounce" />
              <div className="text-sm font-bold">SYSTEM SECURITY ALERT</div>
            </div>
            <p className="text-xs mb-3">{error}</p>
            <div className="flex space-x-2">
              <button className="bg-red-800 hover:bg-red-900 px-3 py-1 rounded text-xs">
                Fix Now
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-xs">
                Ignore
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Screen overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-red-200 text-center animate-pulse">
          <h1 className="text-6xl font-bold mb-4 text-red-300">SYSTEM COMPROMISED</h1>
          <p className="text-xl">Multiple critical errors detected!</p>
          <p className="text-lg mt-2">System will restart automatically...</p>
        </div>
      </div>
    </div>
  );
};

export default VirusErrorScreen;

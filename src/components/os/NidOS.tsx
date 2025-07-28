import { useState, useEffect } from 'react';
import BootScreen from './BootScreen';
import Desktop from './Desktop';

type OSState = 'booting' | 'desktop' | 'shutdown';

const NidOS = () => {
  const [osState, setOSState] = useState<OSState>('booting');

  const handleBootComplete = () => {
    setOSState('desktop');
  };

  // Handle system events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + F4 to close windows (simulated)
      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        console.log('Alt+F4 pressed - Close window');
      }
      
      // Windows key to open start menu (simulated)
      if (e.key === 'Meta' || e.key === 'Super') {
        e.preventDefault();
        console.log('Windows key pressed - Open start menu');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent right-click context menu for more realistic OS feel
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden select-none">
      {osState === 'booting' && (
        <BootScreen onBootComplete={handleBootComplete} />
      )}
      
      {osState === 'desktop' && (
        <Desktop />
      )}
    </div>
  );
};

export default NidOS;
import { useState, useEffect } from 'react';
import BootScreen from './BootScreen';
import BiosScreen from './BiosScreen';
import Desktop from './Desktop';

type OSState = 'booting' | 'bios' | 'desktop' | 'shutdown';

const NidOS = () => {
  const [osState, setOSState] = useState<OSState>('booting');

  const handleBootComplete = () => {
    setOSState('desktop');
  };

  const handleEnterBios = () => {
    setOSState('bios');
  };

  const handleExitBios = () => {
    setOSState('desktop');
  };

  const handleReboot = () => {
    setOSState('booting');
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

    const handleSystemRestart = () => {
      setOSState('booting');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('systemRestart', handleSystemRestart);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('systemRestart', handleSystemRestart);
    };
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
        <BootScreen onBootComplete={handleBootComplete} onEnterBios={handleEnterBios} />
      )}
      
      {osState === 'bios' && (
        <BiosScreen onExitBios={handleExitBios} onReboot={handleReboot} />
      )}
      
      {osState === 'desktop' && (
        <Desktop />
      )}
    </div>
  );
};

export default NidOS;
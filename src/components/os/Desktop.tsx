import { useState, useEffect } from 'react';
import wallpaper from '@/assets/nidos-wallpaper.jpg';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Window from './Window';
import FileExplorer from '../apps/FileExplorer';
import TextEditor from '../apps/TextEditor';
import NotesApp from '../apps/NotesApp';
import Settings from '../apps/Settings';
import NetworkApp from '../apps/NetworkApp';
import VirusErrorScreen from './VirusErrorScreen';

export interface AppWindow {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  isMinimized: boolean;
  zIndex: number;
}

const Desktop = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const [showVirusErrors, setShowVirusErrors] = useState(false);

  const openApp = (appName: string) => {
    const appConfigs = {
      'File Explorer': { component: FileExplorer, title: 'File Explorer' },
      'Text Editor': { component: TextEditor, title: 'Text Editor' },
      'Notes': { component: NotesApp, title: 'Notes' },
      'Settings': { component: Settings, title: 'Settings' },
      'Network': { component: NetworkApp, title: 'Network' },
    };

    const config = appConfigs[appName as keyof typeof appConfigs];
    if (!config) return;

    // Check if app is already open
    const existingWindow = openWindows.find(w => w.title === config.title);
    if (existingWindow) {
      // Bring to front and unminimize
      focusWindow(existingWindow.id);
      return;
    }

    const newWindow: AppWindow = {
      id: Date.now().toString(),
      title: config.title,
      component: config.component,
      isMinimized: false,
      zIndex: nextZIndex,
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
    setShowStartMenu(false);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(prev =>
      prev.map(w => w.id === id ? { ...w, isMinimized: true } : w)
    );
  };

  const focusWindow = (id: string) => {
    setOpenWindows(prev =>
      prev.map(w => 
        w.id === id 
          ? { ...w, isMinimized: false, zIndex: nextZIndex }
          : w
      )
    );
    setNextZIndex(prev => prev + 1);
  };

  // Listen for virus execution
  useEffect(() => {
    const handleRunVirus = () => {
      setShowVirusErrors(true);
    };

    const handleVirusRestart = () => {
      setShowVirusErrors(false);
      // Trigger OS restart
      window.dispatchEvent(new CustomEvent('systemRestart'));
    };

    window.addEventListener('runVirus', handleRunVirus);
    
    return () => {
      window.removeEventListener('runVirus', handleRunVirus);
    };
  }, []);

  if (showVirusErrors) {
    return <VirusErrorScreen onRestart={() => window.dispatchEvent(new CustomEvent('systemRestart'))} />;
  }

  return (
    <div 
      className="relative w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={() => setShowStartMenu(false)}
    >
      {/* Desktop Icons */}
      <div className="absolute top-6 left-6 grid grid-cols-1 gap-4">
        {['My Computer', 'Recycle Bin', 'Network'].map((icon, index) => (
          <div
            key={icon}
            className="flex flex-col items-center p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all duration-200 group"
            onDoubleClick={() => {
              if (icon === 'My Computer') openApp('File Explorer');
              if (icon === 'Network') openApp('Network');
            }}
          >
            <div className="w-14 h-14 bg-white/15 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-2 group-hover:scale-105 transition-all duration-200 border border-white/20">
              <span className="text-white text-lg font-bold">
                {icon === 'My Computer' ? '💻' : icon === 'Recycle Bin' ? '🗑️' : '🌐'}
              </span>
            </div>
            <span className="text-white text-xs text-center drop-shadow-lg font-medium">
              {icon}
            </span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {openWindows.map(window => !window.isMinimized && (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          zIndex={window.zIndex}
        >
          <window.component />
        </Window>
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu 
          onAppClick={openApp}
          onClose={() => setShowStartMenu(false)}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        openWindows={openWindows}
        onWindowClick={focusWindow}
        onWindowClose={closeWindow}
      />
    </div>
  );
};

export default Desktop;
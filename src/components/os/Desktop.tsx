import { useState } from 'react';
import wallpaper from '@/assets/nidos-wallpaper.jpg';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Window from './Window';
import FileExplorer from '../apps/FileExplorer';
import TextEditor from '../apps/TextEditor';
import NotesApp from '../apps/NotesApp';
import Settings from '../apps/Settings';

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

  const openApp = (appName: string) => {
    const appConfigs = {
      'File Explorer': { component: FileExplorer, title: 'File Explorer' },
      'Text Editor': { component: TextEditor, title: 'Text Editor' },
      'Notes': { component: NotesApp, title: 'Notes' },
      'Settings': { component: Settings, title: 'Settings' },
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
            className="flex flex-col items-center p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-os group"
            onDoubleClick={() => {
              if (icon === 'My Computer') openApp('File Explorer');
            }}
          >
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <span className="text-white text-xs font-bold">
                {icon === 'My Computer' ? 'PC' : icon === 'Recycle Bin' ? 'RB' : 'NET'}
              </span>
            </div>
            <span className="text-white text-xs text-center drop-shadow-lg">
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
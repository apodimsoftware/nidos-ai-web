import { useState, useEffect } from 'react';
import { Search, Wifi, Volume2, Battery, Monitor } from 'lucide-react';
import type { AppWindow } from './Desktop';

interface TaskbarProps {
  onStartClick: () => void;
  openWindows: AppWindow[];
  onWindowClick: (id: string) => void;
  onWindowClose: (id: string) => void;
}

const Taskbar = ({ onStartClick, openWindows, onWindowClick, onWindowClose }: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 glass-panel backdrop-blur-xl border-t border-white/10 flex items-center px-2 z-50">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className="flex items-center justify-center p-2 hover:bg-white/10 rounded-lg transition-os"
      >
        <div className="w-6 h-6 bg-gradient-primary rounded-sm flex items-center justify-center">
          <span className="text-white text-xs font-bold">N</span>
        </div>
      </button>

      {/* Search */}
      <div className="flex items-center ml-2 bg-white/5 rounded-lg px-3 py-1 min-w-[200px]">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input 
          type="text" 
          placeholder="Type here to search"
          className="bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground flex-1"
        />
      </div>

      {/* Running Apps */}
      <div className="flex items-center ml-4 space-x-1">
        {openWindows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`taskbar-item ${!window.isMinimized ? 'active' : ''} min-w-[120px] max-w-[200px] text-xs text-left`}
            title={window.title}
          >
            <div className="truncate">{window.title}</div>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center ml-auto space-x-2">
        {/* Quick Actions */}
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-white/10 rounded">
            <Wifi className="w-4 h-4 text-foreground" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded">
            <Volume2 className="w-4 h-4 text-foreground" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded">
            <Battery className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Time and Date */}
        <div className="text-right text-xs text-foreground px-2">
          <div className="font-medium">{formatTime(currentTime)}</div>
          <div className="text-muted-foreground">{formatDate(currentTime)}</div>
        </div>

        {/* Show Desktop */}
        <div className="w-2 h-6 hover:bg-white/20 cursor-pointer border-l border-white/20" />
      </div>
    </div>
  );
};

export default Taskbar;
import { useState, useEffect } from 'react';
import { Search, Wifi, Volume2, Battery, Monitor } from 'lucide-react';
import type { AppWindow } from './Desktop';
import WifiMenu from './WifiMenu';
import VolumeMenu from './VolumeMenu';
import BatteryMenu from './BatteryMenu';

interface TaskbarProps {
  onStartClick: () => void;
  openWindows: AppWindow[];
  onWindowClick: (id: string) => void;
  onWindowClose: (id: string) => void;
}

const Taskbar = ({ onStartClick, openWindows, onWindowClick, onWindowClose }: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<'wifi' | 'volume' | 'battery' | null>(null);
  const [isCharging, setIsCharging] = useState(false);

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

  const toggleMenu = (menu: 'wifi' | 'volume' | 'battery') => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <>
      {/* System Menus */}
      {activeMenu === 'wifi' && <WifiMenu onClose={() => setActiveMenu(null)} />}
      {activeMenu === 'volume' && <VolumeMenu onClose={() => setActiveMenu(null)} />}
      {activeMenu === 'battery' && (
        <BatteryMenu 
          onClose={() => setActiveMenu(null)} 
          isCharging={isCharging}
          setIsCharging={setIsCharging}
        />
      )}

      <div 
        className="fixed bottom-2 left-1/2 transform -translate-x-1/2 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center px-3 z-50 shadow-2xl"
        onClick={() => setActiveMenu(null)}
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
      {/* Start Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStartClick();
        }}
        className="flex items-center justify-center p-2 hover:bg-white/15 rounded-xl transition-all duration-200 mr-2"
      >
        <div className="w-7 h-7 bg-gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-bold">N</span>
        </div>
      </button>

      {/* Search */}
      <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 min-w-[240px] mr-2">
        <Search className="w-4 h-4 text-white/60 mr-3" />
        <input 
          type="text" 
          placeholder="Type here to search"
          className="bg-transparent outline-none text-sm text-white placeholder-white/60 flex-1"
        />
      </div>

      {/* Running Apps */}
      <div className="flex items-center space-x-1 mr-2">
        {openWindows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`px-3 py-2 rounded-xl transition-all duration-200 min-w-[40px] max-w-[150px] text-xs ${
              !window.isMinimized 
                ? 'bg-white/20 border-b-2 border-blue-400' 
                : 'hover:bg-white/10'
            }`}
            title={window.title}
          >
            <div className="truncate text-white">{window.title}</div>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-1">
        {/* Quick Actions */}
        <div className="flex items-center bg-white/10 rounded-xl p-1 space-x-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu('wifi');
            }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              activeMenu === 'wifi' ? 'bg-white/20' : 'hover:bg-white/15'
            }`}
          >
            <Wifi className="w-4 h-4 text-white" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu('volume');
            }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              activeMenu === 'volume' ? 'bg-white/20' : 'hover:bg-white/15'
            }`}
          >
            <Volume2 className="w-4 h-4 text-white" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu('battery');
            }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              activeMenu === 'battery' ? 'bg-white/20' : 'hover:bg-white/15'
            }`}
          >
            <Battery className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Time and Date */}
        <button className="text-right text-xs text-white px-3 py-2 hover:bg-white/10 rounded-xl transition-all duration-200">
          <div className="font-medium">{formatTime(currentTime)}</div>
          <div className="text-white/70">{formatDate(currentTime)}</div>
        </button>
      </div>
      </div>
    </>
  );
};

export default Taskbar;
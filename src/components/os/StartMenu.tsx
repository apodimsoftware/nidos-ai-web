import { Power, User, Settings, FolderOpen, FileText, StickyNote, Monitor, Search, ChevronRight, Network, Gamepad2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

interface StartMenuProps {
  onAppClick: (appName: string) => void;
  onClose: () => void;
}

const StartMenu = ({ onAppClick, onClose }: StartMenuProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  const pinnedApps = [
    { name: 'File Explorer', displayName: t('fileExplorer'), icon: FolderOpen },
    { name: 'Text Editor', displayName: t('textEditor'), icon: FileText },
    { name: 'Notes', displayName: t('notes'), icon: StickyNote },
    { name: 'Network', displayName: 'Network', icon: Network },
  ];

  const recentApps = [
    { name: 'Settings', displayName: t('settings'), icon: Settings },
    { name: 'Text Editor', displayName: t('textEditor'), icon: FileText },
  ];

  const systemItems = [
    { name: 'Documents', icon: FileText, action: () => onAppClick('File Explorer') },
    { name: 'Pictures', icon: Monitor, action: () => onAppClick('File Explorer') },
    { name: 'Music', icon: Gamepad2, action: () => onAppClick('File Explorer') },
    { name: 'Computer', icon: Monitor, action: () => onAppClick('File Explorer') },
    { name: 'Control Panel', icon: Settings, action: () => onAppClick('Settings') },
  ];

  const powerOptions = [
    { name: t('shutdown'), action: () => console.log('Shutdown') },
    { name: t('restart'), action: () => window.location.reload() },
    { name: t('sleep'), action: () => console.log('Sleep mode') },
  ];

  const handleAppClick = (appName: string) => {
    onAppClick(appName);
    onClose();
  };

  const filteredApps = searchQuery
    ? [...pinnedApps, ...recentApps].filter(app =>
        app.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [...pinnedApps, ...recentApps];

  return (
    <div 
      className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-[600px] h-[700px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl os-slide-up z-40"
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
      }}
    >
      {/* Main Content */}
      <div className="flex flex-col h-full">
        {/* Search Box */}
        <div className="p-6 pb-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Type here to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col px-6">
          {searchQuery ? (
            /* Search Results */
            <div className="flex-1">
              <div className="text-sm font-medium text-white/80 mb-4">Search results</div>
              <div className="grid grid-cols-6 gap-3">
                {filteredApps.map(app => (
                  <button
                    key={app.name}
                    onClick={() => handleAppClick(app.name)}
                    className="flex flex-col items-center p-3 hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center mb-2">
                      <app.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-white/90 text-center leading-tight">{app.displayName}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Default View */
            <>
              {/* Pinned Section */}
              <div className="mb-6">
                <div className="text-sm font-medium text-white/80 mb-4">Pinned</div>
                <div className="grid grid-cols-6 gap-3">
                  {pinnedApps.map(app => (
                    <button
                      key={app.name}
                      onClick={() => handleAppClick(app.name)}
                      className="flex flex-col items-center p-3 hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                      <div className="w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center mb-2">
                        <app.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs text-white/90 text-center leading-tight">{app.displayName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Section */}
              <div className="flex-1">
                <div className="text-sm font-medium text-white/80 mb-4">Recommended</div>
                <div className="space-y-2">
                  {recentApps.map(app => (
                    <button
                      key={`recent-${app.name}`}
                      onClick={() => handleAppClick(app.name)}
                      className="w-full flex items-center p-3 hover:bg-white/10 rounded-lg transition-all duration-200 text-left"
                    >
                      <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center mr-3">
                        <app.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{app.displayName}</div>
                        <div className="text-xs text-white/60">Recently used</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between p-6 pt-3 border-t border-white/10">
          {/* User Profile */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">NidOS User</div>
              <div className="text-xs text-white/60">{t('administrator')}</div>
            </div>
          </div>

          {/* Power Button */}
          <div className="relative group">
            <button className="w-10 h-10 bg-white/15 hover:bg-white/25 rounded-lg flex items-center justify-center transition-all duration-200">
              <Power className="w-5 h-5 text-white" />
            </button>
            
            {/* Power Options Submenu */}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
              <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-lg p-2 min-w-[120px]">
                {powerOptions.map(option => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className="w-full text-left px-3 py-2 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
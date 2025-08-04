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
      className="fixed bottom-12 left-0 w-[520px] h-[580px] bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-tr-lg rounded-tl-lg shadow-2xl os-slide-up z-40"
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
        boxShadow: '0 0 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
      }}
    >
      {/* Main Content */}
      <div className="flex h-full">
        {/* Left Column - Programs */}
        <div className="flex-1 flex flex-col">
          {/* User Profile */}
          <div className="flex items-center p-4 border-b border-white/10 bg-gradient-to-r from-white/10 to-transparent">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">NidOS User</div>
              <div className="text-xs text-white/70">{t('administrator')}</div>
            </div>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search programs and files"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/20 rounded text-white placeholder-white/50 text-sm focus:outline-none focus:border-blue-400 focus:bg-black/30"
              />
            </div>
          </div>

          {/* Programs List */}
          <div className="flex-1 overflow-y-auto">
            {searchQuery ? (
              <div className="p-2">
                <div className="text-xs font-medium text-white/70 mb-2 px-2">Search Results</div>
                {filteredApps.map(app => (
                  <button
                    key={app.name}
                    onClick={() => handleAppClick(app.name)}
                    className="w-full flex items-center p-2 hover:bg-blue-500/30 rounded transition-all duration-200 text-left"
                  >
                    <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center mr-3">
                      <app.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-white text-sm">{app.displayName}</span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                {/* Pinned Programs */}
                <div className="p-2">
                  <div className="text-xs font-medium text-white/70 mb-2 px-2">Pinned Programs</div>
                  {pinnedApps.map(app => (
                    <button
                      key={app.name}
                      onClick={() => handleAppClick(app.name)}
                      className="w-full flex items-center p-2 hover:bg-blue-500/30 rounded transition-all duration-200 text-left"
                    >
                      <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center mr-3">
                        <app.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-white text-sm">{app.displayName}</span>
                    </button>
                  ))}
                </div>

                {/* Separator */}
                <div className="border-t border-white/10 mx-4"></div>

                {/* Recent Programs */}
                <div className="p-2">
                  <div className="text-xs font-medium text-white/70 mb-2 px-2">Recent Programs</div>
                  {recentApps.map(app => (
                    <button
                      key={`recent-${app.name}`}
                      onClick={() => handleAppClick(app.name)}
                      className="w-full flex items-center p-2 hover:bg-blue-500/30 rounded transition-all duration-200 text-left"
                    >
                      <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center mr-3">
                        <app.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-white text-sm">{app.displayName}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* All Programs Link */}
          <div className="border-t border-white/10 p-3">
            <button className="w-full flex items-center justify-between p-2 hover:bg-blue-500/30 rounded transition-all duration-200">
              <span className="text-white text-sm font-medium">All Programs</span>
              <ChevronRight className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>

        {/* Right Column - System Items */}
        <div className="w-48 bg-gradient-to-b from-black/20 to-black/10 border-l border-white/10">
          <div className="p-3 space-y-1">
            {systemItems.map(item => (
              <button
                key={item.name}
                onClick={item.action}
                className="w-full flex items-center p-2 hover:bg-blue-500/30 rounded transition-all duration-200 text-left"
              >
                <item.icon className="w-4 h-4 text-white mr-3" />
                <span className="text-white text-sm">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-0 right-0 w-48 border-t border-white/10 bg-gradient-to-b from-black/10 to-black/20">
            {/* Search Box Bottom */}
            <div className="p-3 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-1.5 bg-black/20 border border-white/20 rounded text-white placeholder-white/50 text-xs focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            {/* Power Button */}
            <div className="p-2 flex justify-end">
              <div className="relative group">
                <button className="w-10 h-10 bg-gradient-to-b from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 rounded flex items-center justify-center shadow-lg transition-all duration-200">
                  <Power className="w-5 h-5 text-white" />
                </button>
                
                {/* Power Options Submenu */}
                <div className="absolute bottom-full right-0 mb-1 hidden group-hover:block">
                  <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded p-1 min-w-[100px]">
                    {powerOptions.map(option => (
                      <button
                        key={option.name}
                        onClick={option.action}
                        className="w-full text-left px-3 py-2 hover:bg-white/10 rounded text-white text-sm transition-colors"
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
      </div>
    </div>
  );
};

export default StartMenu;
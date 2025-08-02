import { Power, User, Settings, FolderOpen, FileText, StickyNote, Monitor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StartMenuProps {
  onAppClick: (appName: string) => void;
  onClose: () => void;
}

const StartMenu = ({ onAppClick, onClose }: StartMenuProps) => {
  const { t } = useLanguage();
  
  const apps = [
    { name: 'File Explorer', displayName: t('fileExplorer'), icon: FolderOpen, description: 'Browse files and folders' },
    { name: 'Text Editor', displayName: t('textEditor'), icon: FileText, description: 'Edit text documents' },
    { name: 'Notes', displayName: t('notes'), icon: StickyNote, description: 'Take quick notes' },
    { name: 'Settings', displayName: t('settings'), icon: Settings, description: 'System preferences' },
  ];

  const powerOptions = [
    { name: t('sleep'), action: () => console.log('Sleep mode') },
    { name: t('restart'), action: () => window.location.reload() },
    { name: t('shutdown'), action: () => {
      // We'll implement proper shutdown later
      console.log('Shutdown');
    }},
  ];

  return (
    <div 
      className="fixed bottom-12 left-2 w-96 glass-panel backdrop-blur-xl rounded-lg p-4 os-slide-up z-40"
      onClick={(e) => e.stopPropagation()}
    >
      {/* User Section */}
      <div className="flex items-center p-3 hover:bg-white/5 rounded-lg cursor-pointer mb-4">
        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-medium text-foreground">NidOS User</div>
          <div className="text-xs text-muted-foreground">{t('administrator')}</div>
        </div>
      </div>

      {/* Apps Section */}
      <div className="mb-4">
        <div className="text-xs font-medium text-muted-foreground mb-2 px-2">{t('applications')}</div>
        <div className="space-y-1">
          {apps.map(app => (
            <button
              key={app.name}
              onClick={() => onAppClick(app.name)}
              className="w-full flex items-center p-2 hover:bg-white/5 rounded-lg transition-os text-left"
            >
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                <app.icon className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">{app.displayName}</div>
                <div className="text-xs text-muted-foreground">{app.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Power Options */}
      <div className="border-t border-white/10 pt-3">
        <div className="flex items-center justify-between">
          {powerOptions.map(option => (
            <button
              key={option.name}
              onClick={option.action}
              className="flex items-center justify-center p-2 hover:bg-white/5 rounded-lg transition-os flex-1 mx-1"
              title={option.name}
            >
              <Power className="w-4 h-4 text-foreground" />
              <span className="text-xs ml-1 text-foreground">{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
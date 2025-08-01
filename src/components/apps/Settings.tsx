import { useState } from 'react';
import { Monitor, Palette, Volume2, Wifi, Shield, User, Bell, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('display');
  const { t } = useLanguage();

  const sections = [
    { id: 'display', name: t('display'), icon: Monitor },
    { id: 'appearance', name: t('appearance'), icon: Palette },
    { id: 'sound', name: t('sound'), icon: Volume2 },
    { id: 'network', name: t('network'), icon: Wifi },
    { id: 'security', name: t('security'), icon: Shield },
    { id: 'accounts', name: t('accounts'), icon: User },
    { id: 'notifications', name: t('notifications'), icon: Bell },
    { id: 'language', name: t('language'), icon: Globe },
  ];

  const renderDisplaySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('displaySettings')}</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{t('resolution')}</span>
              <p className="text-sm text-muted-foreground">{t('resolutionDesc')}</p>
            </div>
            <select className="bg-accent border border-border rounded-lg px-3 py-2">
              <option>1920 x 1080 ({t('recommended')})</option>
              <option>1366 x 768</option>
              <option>2560 x 1440</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{t('scale')}</span>
              <p className="text-sm text-muted-foreground">{t('scaleDesc')}</p>
            </div>
            <select className="bg-accent border border-border rounded-lg px-3 py-2">
              <option>100% ({t('recommended')})</option>
              <option>125%</option>
              <option>150%</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{t('orientation')}</span>
              <p className="text-sm text-muted-foreground">{t('orientationDesc')}</p>
            </div>
            <select className="bg-accent border border-border rounded-lg px-3 py-2">
              <option>{t('landscape')}</option>
              <option>{t('portrait')}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('appearanceSettings')}</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{t('theme')}</span>
              <p className="text-sm text-muted-foreground">{t('themeDesc')}</p>
            </div>
            <select className="bg-accent border border-border rounded-lg px-3 py-2">
              <option>{t('darkCurrent')}</option>
              <option>{t('light')}</option>
              <option>{t('auto')}</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{t('accentColor')}</span>
              <p className="text-sm text-muted-foreground">{t('accentColorDesc')}</p>
            </div>
            <div className="flex space-x-2">
              {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map(color => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full cursor-pointer border-2 border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{t('transparencyEffects')}</span>
              <p className="text-sm text-muted-foreground">{t('transparencyDesc')}</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSoundSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('soundSettingsPage')}</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{t('masterVolume')}</span>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <input type="range" defaultValue={75} className="w-full" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{t('systemSounds')}</span>
              <span className="text-sm text-muted-foreground">50%</span>
            </div>
            <input type="range" defaultValue={50} className="w-full" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{t('notificationSounds')}</span>
              <p className="text-sm text-muted-foreground">{t('notificationSoundsDesc')}</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguageSettings = () => {
    const { language, setLanguage } = useLanguage();
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('languageSettings')}</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{t('systemLanguage')}</span>
                <p className="text-sm text-muted-foreground">{t('systemLanguageDesc')}</p>
              </div>
              <select 
                className="bg-accent border border-border rounded-lg px-3 py-2"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'el')}
              >
                <option value="en">English</option>
                <option value="el">Ελληνικά (Greek)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'display':
        return renderDisplaySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'sound':
        return renderSoundSettings();
      case 'language':
        return renderLanguageSettings();
      default:
        return (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <p>Settings for {sections.find(s => s.id === activeSection)?.name}</p>
              <p className="text-sm mt-2">{t('comingSoon')}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex bg-card">
      {/* Sidebar */}
      <div className="w-64 border-r border-border">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">{t('settings')}</h2>
        </div>
        
        <div className="p-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center p-3 rounded-lg transition-os text-left ${
                activeSection === section.id 
                  ? 'bg-primary/20 text-primary' 
                  : 'hover:bg-accent'
              }`}
            >
              <section.icon className="w-5 h-5 mr-3" />
              <span className="text-sm">{section.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
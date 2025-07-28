import { useState } from 'react';
import { Monitor, Palette, Volume2, Wifi, Shield, User, Bell, Globe } from 'lucide-react';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('display');

  const sections = [
    { id: 'display', name: 'Display', icon: Monitor },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'sound', name: 'Sound', icon: Volume2 },
    { id: 'network', name: 'Network', icon: Wifi },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'accounts', name: 'Accounts', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'language', name: 'Language', icon: Globe },
  ];

  const renderDisplaySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Resolution</span>
              <p className="text-sm text-muted-foreground">Choose your display resolution</p>
            </div>
            <select className="bg-accent border border-border rounded-lg px-3 py-2">
              <option>1920 x 1080 (Recommended)</option>
              <option>1366 x 768</option>
              <option>2560 x 1440</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Scale</span>
              <p className="text-sm text-muted-foreground">Make text and apps larger or smaller</p>
            </div>
            <select className="bg-accent border border-border rounded-lg px-3 py-2">
              <option>100% (Recommended)</option>
              <option>125%</option>
              <option>150%</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Orientation</span>
              <p className="text-sm text-muted-foreground">Screen orientation</p>
            </div>
            <select className="bg-accent border border-border rounded-lg px-3 py-2">
              <option>Landscape</option>
              <option>Portrait</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Appearance Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Theme</span>
              <p className="text-sm text-muted-foreground">Choose your color theme</p>
            </div>
            <select className="bg-accent border border-border rounded-lg px-3 py-2">
              <option>Dark (Current)</option>
              <option>Light</option>
              <option>Auto</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Accent Color</span>
              <p className="text-sm text-muted-foreground">Customize your accent color</p>
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
              <span className="font-medium">Transparency Effects</span>
              <p className="text-sm text-muted-foreground">Enable glass and blur effects</p>
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
        <h3 className="text-lg font-semibold mb-4">Sound Settings</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Master Volume</span>
              <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <input type="range" defaultValue={75} className="w-full" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">System Sounds</span>
              <span className="text-sm text-muted-foreground">50%</span>
            </div>
            <input type="range" defaultValue={50} className="w-full" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Notification Sounds</span>
              <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'display':
        return renderDisplaySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'sound':
        return renderSoundSettings();
      default:
        return (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <p>Settings for {sections.find(s => s.id === activeSection)?.name}</p>
              <p className="text-sm mt-2">This section is coming soon!</p>
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
          <h2 className="font-semibold">Settings</h2>
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
import { useState, useEffect } from 'react';
import { ChevronRight, Save, RotateCcw, Power } from 'lucide-react';

interface BiosScreenProps {
  onExitBios: () => void;
  onReboot: () => void;
}

const BiosScreen = ({ onExitBios, onReboot }: BiosScreenProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [bootOrder, setBootOrder] = useState(['Hard Drive', 'USB Drive', 'Network']);
  
  // Load settings from localStorage or use defaults
  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('nidos-bios-settings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Failed to load BIOS settings from localStorage');
    }
    return {
      virtualization: true,
      hyperThreading: true,
      fastBoot: true,
      secureBoot: true,
      tmp: true,
      passwordProtection: false
    };
  };

  const [settings, setSettings] = useState(loadSettings);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('nidos-bios-settings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save BIOS settings to localStorage');
    }
  }, [settings]);

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const tabs = [
    { name: 'Main', key: 'main' },
    { name: 'Advanced', key: 'advanced' },
    { name: 'Boot', key: 'boot' },
    { name: 'Security', key: 'security' },
    { name: 'Exit', key: 'exit' }
  ];

  const handleSaveAndExit = () => {
    onExitBios();
  };

  const handleReboot = () => {
    onReboot();
  };

  const moveBootItem = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...bootOrder];
    if (direction === 'up' && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    setBootOrder(newOrder);
  };

  const renderTabContent = () => {
    switch (tabs[selectedTab].key) {
      case 'main':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div>
                <h3 className="text-cyan-400 mb-2">System Information</h3>
                <div className="space-y-1 text-sm">
                  <div>BIOS Version: v1.0.2</div>
                  <div>Build Date: 02082025</div>
                  <div>CPU: Ipel Core i7-12700K</div>
                  <div>Memory: 16384 MB</div>
                  <div>Storage: 1TB NVMe SSD (Samshung)</div>
                </div>
              </div>
              <div>
                <h3 className="text-cyan-400 mb-2">System Time</h3>
                <div className="space-y-1 text-sm">
                  <div>Date: {new Date().toLocaleDateString()}</div>
                  <div>Time: {new Date().toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'boot':
        return (
          <div className="space-y-4">
            <h3 className="text-cyan-400 mb-4">Boot Order</h3>
            <div className="space-y-2">
              {bootOrder.map((item, index) => (
                <div key={item} className="flex items-center justify-between bg-gray-800/50 p-2 rounded">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-400">#{index + 1}</span>
                    <span>{item}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveBootItem(index, 'up')}
                      disabled={index === 0}
                      className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveBootItem(index, 'down')}
                      disabled={index === bootOrder.length - 1}
                      className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'advanced':
        return (
          <div className="space-y-4">
            <h3 className="text-cyan-400 mb-4">Advanced Settings</h3>
            <div className="space-y-3">
              <button
                onClick={() => toggleSetting('virtualization')}
                className="w-full flex justify-between items-center p-2 hover:bg-gray-800/50 rounded transition-colors"
              >
                <span>Enable Virtualization</span>
                <span className={settings.virtualization ? "text-green-400" : "text-red-400"}>
                  [{settings.virtualization ? 'Enabled' : 'Disabled'}]
                </span>
              </button>
              <button
                onClick={() => toggleSetting('hyperThreading')}
                className="w-full flex justify-between items-center p-2 hover:bg-gray-800/50 rounded transition-colors"
              >
                <span>Hyper-Threading</span>
                <span className={settings.hyperThreading ? "text-green-400" : "text-red-400"}>
                  [{settings.hyperThreading ? 'Enabled' : 'Disabled'}]
                </span>
              </button>
              <button
                onClick={() => toggleSetting('fastBoot')}
                className="w-full flex justify-between items-center p-2 hover:bg-gray-800/50 rounded transition-colors"
              >
                <span>Fast Boot</span>
                <span className={settings.fastBoot ? "text-green-400" : "text-red-400"}>
                  [{settings.fastBoot ? 'Enabled' : 'Disabled'}]
                </span>
              </button>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-4">
            <h3 className="text-cyan-400 mb-4">Security Settings</h3>
            <div className="space-y-3">
              <button
                onClick={() => toggleSetting('secureBoot')}
                className="w-full flex justify-between items-center p-2 hover:bg-gray-800/50 rounded transition-colors"
              >
                <span>Secure Boot</span>
                <span className={settings.secureBoot ? "text-green-400" : "text-red-400"}>
                  [{settings.secureBoot ? 'Enabled' : 'Disabled'}]
                </span>
              </button>
              <button
                onClick={() => toggleSetting('tmp')}
                className="w-full flex justify-between items-center p-2 hover:bg-gray-800/50 rounded transition-colors"
              >
                <span>TPM 2.0</span>
                <span className={settings.tmp ? "text-green-400" : "text-red-400"}>
                  [{settings.tmp ? 'Enabled' : 'Disabled'}]
                </span>
              </button>
              <button
                onClick={() => toggleSetting('passwordProtection')}
                className="w-full flex justify-between items-center p-2 hover:bg-gray-800/50 rounded transition-colors"
              >
                <span>Password Protection</span>
                <span className={settings.passwordProtection ? "text-green-400" : "text-red-400"}>
                  [{settings.passwordProtection ? 'Enabled' : 'Disabled'}]
                </span>
              </button>
            </div>
          </div>
        );
      case 'exit':
        return (
          <div className="space-y-4">
            <h3 className="text-cyan-400 mb-4">Exit Options</h3>
            <div className="space-y-3">
              <button
                onClick={handleSaveAndExit}
                className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded flex items-center justify-between"
              >
                <span>Save Changes and Exit</span>
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={onExitBios}
                className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded flex items-center justify-between"
              >
                <span>Discard Changes and Exit</span>
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleReboot}
                className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded flex items-center justify-between"
              >
                <span>Restart System</span>
                <Power className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to view settings</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white font-mono text-xs sm:text-sm">
      {/* Header */}
      <div className="bg-cyan-600 text-black px-2 sm:px-4 py-1 sm:py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="font-bold text-sm sm:text-base">NidOS BIOS Setup Utility v1.0.2</div>
        <div className="text-xs sm:text-sm hidden sm:block">Use ← → to navigate tabs, Enter to select, Esc to exit</div>
      </div>

      <div className="flex flex-col sm:flex-row h-[calc(100vh-40px)] sm:h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <div className="w-full sm:w-48 bg-gray-900 border-b sm:border-b-0 sm:border-r border-gray-700">
          <div className="p-2 sm:p-4">
            <div className="flex sm:flex-col space-x-1 sm:space-x-0 sm:space-y-1 overflow-x-auto sm:overflow-x-visible">
              {tabs.map((tab, index) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(index)}
                  className={`whitespace-nowrap sm:w-full text-left p-1 sm:p-2 rounded flex items-center justify-between transition-colors text-xs sm:text-sm ${
                    selectedTab === index
                      ? 'bg-cyan-600 text-black'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <span className="px-2 sm:px-0">{tab.name}</span>
                  {selectedTab === index && <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:block" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-1 sm:p-2">
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-400 space-y-1 sm:space-y-0">
          <div className="text-center sm:text-left">F2: Setup | F10: Save & Exit | Esc: Exit</div>
          <div className="text-center sm:text-right">Apodim's Software  2025</div>
        </div>
      </div>
    </div>
  );
};

export default BiosScreen;

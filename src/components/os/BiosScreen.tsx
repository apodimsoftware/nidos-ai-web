import { useState } from 'react';
import { ChevronRight, Save, RotateCcw, Power } from 'lucide-react';

interface BiosScreenProps {
  onExitBios: () => void;
  onReboot: () => void;
}

const BiosScreen = ({ onExitBios, onReboot }: BiosScreenProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [bootOrder, setBootOrder] = useState(['Hard Drive', 'USB Drive', 'Network']);

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
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-cyan-400 mb-2">System Information</h3>
                <div className="space-y-1 text-sm">
                  <div>BIOS Version: v0.0.1</div>
                  <div>Build Date: 20241128</div>
                  <div>CPU: Intel Core i7-12700K</div>
                  <div>Memory: 16384 MB</div>
                  <div>Storage: 1TB NVMe SSD</div>
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
              <div className="flex justify-between items-center">
                <span>Enable Virtualization</span>
                <span className="text-green-400">[Enabled]</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Hyper-Threading</span>
                <span className="text-green-400">[Enabled]</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fast Boot</span>
                <span className="text-green-400">[Enabled]</span>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-4">
            <h3 className="text-cyan-400 mb-4">Security Settings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Secure Boot</span>
                <span className="text-green-400">[Enabled]</span>
              </div>
              <div className="flex justify-between items-center">
                <span>TPM 2.0</span>
                <span className="text-green-400">[Enabled]</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Password Protection</span>
                <span className="text-red-400">[Disabled]</span>
              </div>
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
    <div className="fixed inset-0 bg-black text-white font-mono">
      {/* Header */}
      <div className="bg-cyan-600 text-black px-4 py-2 flex justify-between items-center">
        <div className="font-bold">NidOS BIOS Setup Utility v0.0.1</div>
        <div className="text-sm">Use ← → to navigate tabs, Enter to select, Esc to exit</div>
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <div className="w-48 bg-gray-900 border-r border-gray-700">
          <div className="p-4">
            <div className="space-y-1">
              {tabs.map((tab, index) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(index)}
                  className={`w-full text-left p-2 rounded flex items-center justify-between transition-colors ${
                    selectedTab === index
                      ? 'bg-cyan-600 text-black'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <span>{tab.name}</span>
                  {selectedTab === index && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-2">
        <div className="flex justify-between text-xs text-gray-400">
          <div>F2: Setup | F10: Save & Exit | Esc: Exit without saving</div>
          <div>NidOS Technologies © 2024</div>
        </div>
      </div>
    </div>
  );
};

export default BiosScreen;
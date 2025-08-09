import { Wifi, WifiOff, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNetwork } from '@/contexts/NetworkContext';

interface WifiMenuProps {
  onClose: () => void;
}

const WifiMenu = ({ onClose }: WifiMenuProps) => {
  const { t } = useLanguage();
  const { isWifiEnabled, setIsWifiEnabled, networks, connectToNetwork } = useNetwork();

  const getSignalIcon = (signal: number) => {
    const bars = Math.min(signal, 4);
    return (
      <div className="flex items-end space-x-px">
        {[1, 2, 3, 4].map(bar => (
          <div
            key={bar}
            className={`w-1 ${bar <= bars ? 'bg-primary' : 'bg-muted'}`}
            style={{ height: `${bar * 3 + 2}px` }}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="fixed bottom-[72px] left-1/2 transform -translate-x-1/2 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 os-slide-up z-40 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wifi className="w-5 h-5 text-primary" />
          <span className="font-medium">Wi-Fi</span>
        </div>
        <button
          onClick={() => setIsWifiEnabled(!isWifiEnabled)}
          className={`w-10 h-6 rounded-full transition-os ${
            isWifiEnabled ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
            isWifiEnabled ? 'translate-x-5' : 'translate-x-1'
          }`} />
        </button>
      </div>

      {isWifiEnabled ? (
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {networks.map(network => (
            <button
              key={network.name}
              onClick={() => connectToNetwork(network.name)}
              className={`w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-os ${
                network.connected ? 'bg-primary/10 border border-primary/20' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {getSignalIcon(network.signal)}
                  {network.secured && <Lock className="w-3 h-3 text-muted-foreground" />}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{network.name}</div>
                  {network.connected && (
                    <div className="text-xs text-primary">{t('connected')}</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-8 text-muted-foreground">
          <WifiOff className="w-8 h-8 mb-2" />
          <span className="text-sm">Wi-Fi is turned off</span>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-white/10 mt-4 pt-3">
        <button className="text-xs text-primary hover:underline">
          {t('networkSettings')}
        </button>
      </div>
    </div>
  );
};

export default WifiMenu;
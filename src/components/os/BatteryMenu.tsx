import { useState } from 'react';
import { Battery, Zap, Power } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BatteryMenuProps {
  onClose: () => void;
  isCharging: boolean;
  setIsCharging: (charging: boolean) => void;
}

const BatteryMenu = ({ onClose, isCharging, setIsCharging }: BatteryMenuProps) => {
  const { t } = useLanguage();
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [powerMode, setPowerMode] = useState<'balanced' | 'performance' | 'saver'>('balanced');

  const getBatteryColor = () => {
    if (isCharging) return 'text-green-400';
    if (batteryLevel > 50) return 'text-green-400';
    if (batteryLevel > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTimeRemaining = () => {
    if (isCharging) return `2${t('hour')} 15${t('minutes')} ${t('remaining')}`;
    const hours = Math.floor((batteryLevel / 100) * 8);
    const minutes = Math.floor(((batteryLevel / 100) * 8 % 1) * 60);
    return `${hours}${t('hour')} ${minutes}${t('minutes')} ${t('remaining')}`;
  };

  return (
    <div 
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 os-slide-up z-40 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Battery className={`w-5 h-5 ${getBatteryColor()}`} />
          <span className="font-medium">{t('battery')}</span>
        </div>
        <div className="flex items-center space-x-1">
          {isCharging && <Zap className="w-4 h-4 text-green-400" />}
          <span className={`text-sm ${getBatteryColor()}`}>{batteryLevel}%</span>
        </div>
      </div>

      {/* Battery Visualization */}
      <div className="mb-4">
        <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              isCharging ? 'bg-green-400' : 
              batteryLevel > 50 ? 'bg-green-400' :
              batteryLevel > 20 ? 'bg-yellow-400' : 'bg-red-400'
            }`}
            style={{ width: `${batteryLevel}%` }}
          />
          {isCharging && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {getTimeRemaining()}
        </div>
      </div>

      {/* Power Mode */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">{t('powerMode')}</div>
        <div className="space-y-1">
          {[
            { id: 'saver', name: t('batterySaver'), desc: 'Extends battery life' },
            { id: 'balanced', name: t('balanced'), desc: t('recommended') },
            { id: 'performance', name: t('bestPerformance'), desc: 'Favors performance' },
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setPowerMode(mode.id as any)}
              className={`w-full text-left p-2 rounded-lg transition-os ${
                powerMode === mode.id ? 'bg-primary/20 border border-primary/30' : 'hover:bg-white/5'
              }`}
            >
              <div className="text-sm">{mode.name}</div>
              <div className="text-xs text-muted-foreground">{mode.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button 
          onClick={() => setIsCharging(!isCharging)}
          className={`p-2 rounded-lg transition-os text-xs ${
            isCharging ? 'bg-green-500/20 text-green-400' : 'bg-accent hover:bg-accent/80'
          }`}
        >
          {isCharging ? `🔌 ${t('charging')}` : `🔌 ${t('plugIn')}`}
        </button>
        <button className="p-2 bg-accent hover:bg-accent/80 rounded-lg transition-os text-xs">
          ⚡ Power Plan
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 pt-3">
        <button className="text-xs text-primary hover:underline">
          {t('batterySettings')}
        </button>
      </div>
    </div>
  );
};

export default BatteryMenu;
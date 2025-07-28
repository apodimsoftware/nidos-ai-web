import { useState } from 'react';
import { Volume2, VolumeX, Volume1, VolumeOff } from 'lucide-react';

interface VolumeMenuProps {
  onClose: () => void;
}

const VolumeMenu = ({ onClose }: VolumeMenuProps) => {
  const [masterVolume, setMasterVolume] = useState(75);
  const [systemVolume, setSystemVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);

  const getVolumeIcon = (volume: number, muted: boolean) => {
    if (muted || volume === 0) return VolumeX;
    if (volume < 30) return VolumeOff;
    if (volume < 70) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon(masterVolume, isMuted);

  const handleVolumeChange = (newVolume: number) => {
    setMasterVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div 
      className="fixed bottom-14 right-4 w-72 glass-panel backdrop-blur-xl rounded-lg p-4 os-slide-up z-40"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <VolumeIcon className="w-5 h-5 text-primary" />
          <span className="font-medium">Volume</span>
        </div>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 hover:bg-white/10 rounded-lg transition-os"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-destructive" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Master Volume */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Master</span>
          <span className="text-sm text-muted-foreground">
            {isMuted ? 'Muted' : `${masterVolume}%`}
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : masterVolume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer volume-slider"
          />
        </div>
      </div>

      {/* System Sounds */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">System</span>
          <span className="text-sm text-muted-foreground">{systemVolume}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={systemVolume}
          onChange={(e) => setSystemVolume(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer volume-slider"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button className="p-2 bg-accent hover:bg-accent/80 rounded-lg transition-os text-xs">
          🎵 Media
        </button>
        <button className="p-2 bg-accent hover:bg-accent/80 rounded-lg transition-os text-xs">
          🎮 Games
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 pt-3">
        <button className="text-xs text-primary hover:underline">
          Sound settings
        </button>
      </div>
    </div>
  );
};

export default VolumeMenu;
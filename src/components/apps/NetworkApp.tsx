import { useState } from 'react';
import { Wifi, Globe, Download, AlertTriangle, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNetwork } from '@/contexts/NetworkContext';

const NetworkApp = () => {
  const { t } = useLanguage();
  const { isWifiEnabled, getCurrentNetwork, getSignalStrength } = useNetwork();
  const [downloadStatus, setDownloadStatus] = useState('');
  const [speedTestResult, setSpeedTestResult] = useState<string>('');
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);

  const handleVirusDownload = () => {
    setDownloadStatus('Downloading...');
    
    // Simulate download progress
    setTimeout(() => {
      setDownloadStatus('Download Complete!');
      window.dispatchEvent(new CustomEvent('virusDownloaded', {
        detail: { filename: 'PowerBooster_v2.4_FINAL.exe' }
      }));
      
      // Clear status after 3 seconds
      setTimeout(() => setDownloadStatus(''), 3000);
    }, 2000);
  };

  const handleSpeedTest = () => {
    if (!isWifiEnabled) {
      setSpeedTestResult('Wi-Fi is disabled');
      return;
    }

    const currentNetwork = getCurrentNetwork();
    if (!currentNetwork) {
      setSpeedTestResult('Not connected to any network');
      return;
    }

    setIsTestingSpeed(true);
    setSpeedTestResult('Testing...');

    // Simulate speed test based on signal strength
    setTimeout(() => {
      const baseSpeed = currentNetwork.signal * 250; // 250Mbps per signal bar
      const randomVariation = Math.random() * 100 - 50; // ±50Mbps variation
      const finalSpeed = Math.max(100, baseSpeed + randomVariation); // Minimum 100Mbps
      
      const speedInGbps = finalSpeed / 1000;
      const displaySpeed = finalSpeed >= 1000 
        ? `${speedInGbps.toFixed(2)} Gbps` 
        : `${Math.round(finalSpeed)} Mbps`;
      
      setSpeedTestResult(`${displaySpeed} ⚡`);
      setIsTestingSpeed(false);
    }, 3000);
  };

  const currentNetwork = getCurrentNetwork();

  return (
    <div className="h-full bg-card p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-primary" />
          {t('network')}
        </h1>
        <p className="text-muted-foreground">Network tools and utilities</p>
      </div>

      {/* Network Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Wifi className="w-5 h-5 text-primary mr-2" />
            <h3 className="font-medium">Wi-Fi Status</h3>
          </div>
          {isWifiEnabled && currentNetwork ? (
            <>
              <p className="text-sm text-muted-foreground mb-2">Connected to: {currentNetwork.name}</p>
              <p className="text-sm text-muted-foreground">Signal Strength: {getSignalStrength()}</p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Wi-Fi is disabled or not connected</p>
          )}
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Shield className="w-5 h-5 text-primary mr-2" />
            <h3 className="font-medium">Security</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Firewall: Active</p>
          <p className="text-sm text-muted-foreground">Protection: Enabled</p>
        </div>
      </div>

      {/* Network Tools Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Network Tools</h2>
        <div className="space-y-3">
          
          {/* Speed Test */}
          <div className="glass-panel p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Network Speed Test</h3>
                <p className="text-sm text-muted-foreground">Test your internet connection speed</p>
                {speedTestResult && (
                  <div className="mt-2 flex items-center">
                    <Zap className="w-4 h-4 text-primary mr-1" />
                    <span className="text-sm font-medium text-primary">{speedTestResult}</span>
                  </div>
                )}
              </div>
              <button 
                onClick={handleSpeedTest}
                disabled={isTestingSpeed}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-os disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTestingSpeed ? 'Testing...' : 'Run Test'}
              </button>
            </div>
          </div>

          {/* Fake Virus Download - The main feature */}
          <div className="glass-panel p-4 rounded-lg border-2 border-green-500/30 bg-green-500/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-green-400">🚀 PowerBooster Pro v2.4</h3>
                  <p className="text-sm text-muted-foreground">Boost your network speed by up to 300%!</p>
                  <p className="text-xs text-green-500">FREE DOWNLOAD - Limited Time Offer!</p>
                </div>
              </div>
              <button 
                onClick={handleVirusDownload}
                disabled={!!downloadStatus}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-os disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {downloadStatus || (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </button>
            </div>
            {downloadStatus && (
              <div className="mt-3 text-sm text-green-500">
                ✅ File saved to Downloads folder
              </div>
            )}
          </div>

          {/* Network Diagnostics */}
          <div className="glass-panel p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Network Diagnostics</h3>
                <p className="text-sm text-muted-foreground">Diagnose connection issues</p>
              </div>
              <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-os">
                Diagnose
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="glass-panel p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3" />
          <div>
            <p className="text-sm font-medium">Security Notice</p>
            <p className="text-xs text-muted-foreground">Always download software from trusted sources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkApp;
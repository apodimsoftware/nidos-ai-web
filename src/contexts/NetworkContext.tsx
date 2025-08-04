import { createContext, useContext, useState, ReactNode } from 'react';

export interface Network {
  name: string;
  signal: number;
  secured: boolean;
  connected: boolean;
}

interface NetworkContextType {
  isWifiEnabled: boolean;
  setIsWifiEnabled: (enabled: boolean) => void;
  networks: Network[];
  setNetworks: (networks: Network[]) => void;
  connectToNetwork: (networkName: string) => void;
  getCurrentNetwork: () => Network | null;
  getSignalStrength: () => string;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

interface NetworkProviderProps {
  children: ReactNode;
}

export const NetworkProvider = ({ children }: NetworkProviderProps) => {
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);
  const [networks, setNetworks] = useState<Network[]>([
    { name: 'HOME_NETWORK_5G', signal: 4, secured: true, connected: true },
    { name: 'NidOS_Guest', signal: 3, secured: false, connected: false },
    { name: 'CoffeeShop_WiFi', signal: 2, secured: true, connected: false },
    { name: 'Neighbor_2.4G', signal: 1, secured: true, connected: false },
  ]);

  const connectToNetwork = (networkName: string) => {
    setNetworks(prev => prev.map(network => ({
      ...network,
      connected: network.name === networkName
    })));
  };

  const getCurrentNetwork = () => {
    return networks.find(network => network.connected) || null;
  };

  const getSignalStrength = () => {
    const currentNetwork = getCurrentNetwork();
    if (!currentNetwork || !isWifiEnabled) return 'No connection';
    
    const strengths = ['Poor', 'Fair', 'Good', 'Excellent'];
    return strengths[currentNetwork.signal - 1] || 'Poor';
  };

  return (
    <NetworkContext.Provider value={{
      isWifiEnabled,
      setIsWifiEnabled,
      networks,
      setNetworks,
      connectToNetwork,
      getCurrentNetwork,
      getSignalStrength,
    }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};
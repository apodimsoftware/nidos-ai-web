import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'el';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // OS Components
    administrator: 'Administrator',
    applications: 'Applications',
    fileExplorer: 'File Explorer',
    textEditor: 'Text Editor',
    notes: 'Notes',
    settings: 'Settings',
    sleep: 'Sleep',
    restart: 'Restart',
    shutdown: 'Shutdown',
    typeToSearch: 'Type here to search',
    connected: 'Connected',
    networkSettings: 'Network & Internet settings',
    volume: 'Volume',
    master: 'Master',
    system: 'System',
    soundSettings: 'Sound settings',
    battery: 'Battery',
    hour: 'h',
    minutes: 'm',
    remaining: 'remaining',
    powerMode: 'Power mode',
    batterySaver: 'Battery saver',
    balanced: 'Balanced',
    recommended: 'Recommended',
    bestPerformance: 'Best performance',
    plugIn: 'Plug in',
    charging: 'Charging',
    batterySettings: 'Battery settings',
    am: 'AM',
    pm: 'PM',
    
    // Settings Categories
    display: 'Display',
    appearance: 'Appearance',
    sound: 'Sound',
    network: 'Network',
    security: 'Security',
    accounts: 'Accounts',
    notifications: 'Notifications',
    language: 'Language',
    
    // Settings Content
    displaySettings: 'Display Settings',
    resolution: 'Resolution',
    resolutionDesc: 'Choose your display resolution',
    scale: 'Scale',
    scaleDesc: 'Make text and apps larger or smaller',
    orientation: 'Orientation',
    orientationDesc: 'Screen orientation',
    landscape: 'Landscape',
    portrait: 'Portrait',
    
    appearanceSettings: 'Appearance Settings',
    theme: 'Theme',
    themeDesc: 'Choose your color theme',
    darkCurrent: 'Dark (Current)',
    light: 'Light',
    auto: 'Auto',
    accentColor: 'Accent Color',
    accentColorDesc: 'Customize your accent color',
    transparencyEffects: 'Transparency Effects',
    transparencyDesc: 'Enable glass and blur effects',
    
    soundSettingsPage: 'Sound Settings',
    masterVolume: 'Master Volume',
    systemSounds: 'System Sounds',
    notificationSounds: 'Notification Sounds',
    notificationSoundsDesc: 'Play sounds for notifications',
    
    languageSettings: 'Language Settings',
    systemLanguage: 'System Language',
    systemLanguageDesc: 'Choose your preferred language',
    
    comingSoon: 'This section is coming soon!'
  },
  el: {
    // OS Components
    administrator: 'Διαχειριστής',
    applications: 'Εφαρμογές',
    fileExplorer: 'Εξερεύνηση Αρχείων',
    textEditor: 'Επεξεργαστής Κειμένου',
    notes: 'Σημειώσεις',
    settings: 'Ρυθμίσεις',
    sleep: 'Αναστολή Λειτουργείας',
    restart: 'Επανεκκίνηση',
    shutdown: 'Τερματισμός λειτουργείας',
    typeToSearch: 'Πληκτρολογήστε εδώ για αναζήτηση',
    connected: 'Συνδεδεμένο',
    networkSettings: 'Ρυθμίσεις δικτύου και Ίντερνετ',
    volume: 'Ήχος',
    master: 'Γενικός ήχος',
    system: 'Ήχος συστήματος',
    soundSettings: 'Ρυθμίσεις ήχου',
    battery: 'Μπαταρία',
    hour: 'ώ.',
    minutes: 'λ.',
    remaining: 'μέχρι την πλήρη φόρτιση',
    powerMode: 'Λειτουργία ενέργειας',
    batterySaver: 'Εξοικονόμηση μπαταρίας',
    balanced: 'Ισορροποιημένη',
    recommended: 'Προτεινόμενο',
    bestPerformance: 'Καλύτερες επιδόσεις',
    plugIn: 'Σύνδεση φορτιστή',
    charging: 'φόρτιση',
    batterySettings: 'Ρυθμίσεις μπαταρίας',
    am: 'π.μ.',
    pm: 'μ.μ.',
    
    // Settings Categories
    display: 'Οθόνη',
    appearance: 'Εμφάνιση',
    sound: 'Ήχος',
    network: 'Δίκτυο',
    security: 'Ασφάλεια',
    accounts: 'Χρήστες',
    notifications: 'Ειδοποιήσεις',
    language: 'Γλώσσα',
    
    // Settings Content
    displaySettings: 'Ρυθμίσεις Οθόνης',
    resolution: 'Ανάλυση',
    resolutionDesc: 'Επιλέξτε την ανάλυση της οθόνης σας',
    scale: 'Κλίμακα',
    scaleDesc: 'Κάντε το κείμενο και τις εφαρμογές μεγαλύτερες ή μικρότερες',
    orientation: 'Προσανατολισμός',
    orientationDesc: 'Προσανατολισμός οθόνης',
    landscape: 'Οριζόντια',
    portrait: 'Κατακόρυφα',
    
    appearanceSettings: 'Ρυθμίσεις Εμφάνισης',
    theme: 'Θέμα',
    themeDesc: 'Επιλέξτε το χρωματικό σας θέμα',
    darkCurrent: 'Σκούρο (Τρέχον)',
    light: 'Φωτεινό',
    auto: 'Αυτόματο',
    accentColor: 'Χρώμα Τονισμού',
    accentColorDesc: 'Προσαρμόστε το χρώμα τονισμού σας',
    transparencyEffects: 'Εφέ Διαφάνειας',
    transparencyDesc: 'Ενεργοποιήστε εφέ γυαλιού και θολώματος',
    
    soundSettingsPage: 'Ρυθμίσεις Ήχου',
    masterVolume: 'Γενική Ένταση',
    systemSounds: 'Ήχοι Συστήματος',
    notificationSounds: 'Ήχοι Ειδοποιήσεων',
    notificationSoundsDesc: 'Αναπαραγωγή ήχων για ειδοποιήσεις',
    
    languageSettings: 'Ρυθμίσεις Γλώσσας',
    systemLanguage: 'Γλώσσα Συστήματος',
    systemLanguageDesc: 'Επιλέξτε την προτιμώμενη γλώσσα σας',
    
    comingSoon: 'Αυτή η ενότητα έρχεται σύντομα!'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('nidos-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('nidos-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
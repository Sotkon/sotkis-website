import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr' | 'gr' | 'cr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  }, []);

  // Placeholder translation function - will be implemented with actual translations
  const t = useCallback((key: string): string => {
    return key;
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


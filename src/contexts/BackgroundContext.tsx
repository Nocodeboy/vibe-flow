
import React, { createContext, useContext, useState, ReactNode } from 'react';

type BackgroundTheme = 'nebula' | 'cyber' | 'void' | 'warm' | 'default';

interface BackgroundContextType {
    theme: BackgroundTheme;
    setTheme: (theme: BackgroundTheme) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<BackgroundTheme>('default');

    return (
        <BackgroundContext.Provider value={{ theme, setTheme }}>
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (!context) {
        throw new Error('useBackground must be used within a BackgroundProvider');
    }
    return context;
};

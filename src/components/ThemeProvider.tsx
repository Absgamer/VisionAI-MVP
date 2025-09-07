import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ===== TYPE DEFINITIONS =====
interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
    toggleTheme: () => void;
}


// ===== CONTEXT CREATION =====
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


// ===== THEME PROVIDER =====
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('visionai-theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('visionai-theme', theme);
            // Apply theme to document
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [theme]);

    const setTheme = (newTheme: string) => {
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


// ===== THEME HOOK =====
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 
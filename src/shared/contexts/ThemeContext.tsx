import { createContext, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { LightTheme, DarkTheme } from "./../themes";

interface IThemeContextData {
    themeName: 'light' | 'dark' //aqui fica os temas
    toggleTheme: () => void;
    children: React.ReactNode
}

const ThemeContext = createContext ({} as IThemeContextData);

export const AppThemeProvider: React.FC<IThemeContextData> = ({ children }) => {
    const [themeName, setThemeName] = useState('light');

    return (
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={LightTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}


/* -------------------------- PAREI NO MINUTO 8:45 ------------------ */
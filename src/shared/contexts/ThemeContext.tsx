import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { LightTheme, DarkTheme } from "./../themes";
import { Box } from "@mui/system";

interface IThemeContextData {
    themeName: 'light' | 'dark' //só vai aceitar esses valores
    toggleTheme: () => void;
}

interface IThemeContextProps {
    children: React.ReactNode
}

const ThemeContext = createContext ({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<IThemeContextProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => { //useCallBack armazena funções
        setThemeName(oldThemeName => oldThemeName === "light"? 'dark' : 'light');
    }, []);

    const theme = useMemo(() => {
        if(themeName === 'light') return LightTheme;
        
        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

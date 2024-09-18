import { createContext, useCallback, useContext, useState } from "react";


interface IDrawerOption {
    icon: React.ReactNode;
    path: string;
    label: string;
}

interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOption[];
    toggleDrawerOpen: () => void;
    setDrawerOption: (newDrawerOptions: IDrawerOption[]) => void;
}

interface IThemeContextProps {
    children: React.ReactNode
}

const DrawerContext = createContext ({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<IThemeContextProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setdrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => { //useCallBack armazena funções
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => { //useCallBack armazena funções
        setdrawerOptions(newDrawerOptions);
    }, []);

    return (
        <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOption: handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    );
}

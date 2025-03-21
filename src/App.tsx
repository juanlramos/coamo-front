import { BrowserRouter } from "react-router-dom";
import './shared/forms/traducoesYup';
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { MenuLateral } from "./shared/components";
import { DrawerProvider } from "./shared/contexts";



export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
        <MenuLateral>
            <AppRoutes />
        </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

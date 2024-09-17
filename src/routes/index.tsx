import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {

    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Abrir menu</Button>}/>
            <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}
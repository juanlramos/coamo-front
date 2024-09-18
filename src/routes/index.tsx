import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { IoMdHome, IoMdStar } from "react-icons/io";

export const AppRoutes = () => {

    const { toggleDrawerOpen, setDrawerOption } = useDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                label: "Pagina Inicial",
                icon: <IoMdHome />,
                path: "/pagina-inicial"
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Abrir menu</Button>}/>
            <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}
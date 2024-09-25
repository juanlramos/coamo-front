import { Routes, Route, Navigate } from "react-router";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { IoMdHome, IoMdStar } from "react-icons/io";
import { Dashboard } from "../pages";

export const AppRoutes = () => {

    const { setDrawerOption } = useDrawerContext();

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
            <Route path="/pagina-inicial" element={<Dashboard />}/>
            <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}
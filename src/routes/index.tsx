import { Routes, Route, Navigate } from "react-router";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { IoMdHome, IoMdPeople } from "react-icons/io";
import { Dashboard, ListagemDePessoas, DetalheDePessoas } from "../pages";

export const AppRoutes = () => {

    const { setDrawerOption } = useDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                label: "Pagina Inicial",
                icon: <IoMdHome />,
                path: "/pagina-inicial"
            },
            {
                label: "Pessoas",
                icon: <IoMdPeople />,
                path: "/pessoas"
            }
        ]);
    }, []);

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />}/>
            <Route path="/pessoas" element={<ListagemDePessoas />}/>
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
        </Routes>
    );
}
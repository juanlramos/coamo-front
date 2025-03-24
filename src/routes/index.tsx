import { Routes, Route, Navigate } from "react-router";
import { useEffect } from "react";
import { IoMdHome, IoMdPeople } from "react-icons/io";
import { PiBuildingApartmentFill } from "react-icons/pi";

import { useDrawerContext } from "../shared/contexts";
import {
  Dashboard,
  ListagemDePessoas,
  DetalheDePessoas,
  ListagemDeCidades,
  DetalheDeCidades,
} from "../pages";

export const AppRoutes = () => {
  const { setDrawerOption } = useDrawerContext();

  useEffect(() => {
    setDrawerOption([
      {
        label: "Pagina Inicial",
        icon: <IoMdHome />,
        path: "/pagina-inicial",
      },
      {
        label: "Cidades",
        icon: <PiBuildingApartmentFill />,
        path: "/cidades",
      },
      {
        label: "Pessoas",
        icon: <IoMdPeople />,
        path: "/pessoas",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
      <Route path="/cidades" element={<ListagemDeCidades />} />
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};

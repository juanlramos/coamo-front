import { useNavigate, useParams } from "react-router";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";

export const DetalheDePessoas: React.FC = () => {
  //regatando informações da url (esse ID tem que ser o mesmo que foi passado na rota)
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Salvar");
  }

  const handleDelete = () => {
    console.log("Apagar");
  }


  return (
    <LayoutBaseDePagina
        titulo="DetalheDePessoas"
        barraDeFerramentas={
            <FerramentasDeDetalhe
                textoBotaoNovo="Nova"
                mostrarBotaoSalvarEFechar
                mostrarBotaoApagar={id !== "nova"}
                mostrarBotaoNovo={id !== "nova"}

                aoClicarEmSalvar={handleSave}
                aoClicarEmSalvarEFechar={handleSave}
                aoClicarEmApagar={handleDelete}
                aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")} 
                aoClicarEmVoltar={() => navigate("/pessoas")}               
            />
        }>
      <p>DetalheDePessoas {id}</p>
    </LayoutBaseDePagina>
  );
};

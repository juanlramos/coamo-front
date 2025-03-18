import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VTextField } from "../../shared/forms";
import { useForm } from "react-hook-form";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  //regatando informações da url (esse ID tem que ser o mesmo que foi passado na rota)
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const { control, handleSubmit } = useForm<IFormData>();

  useEffect(() => {
    if (id != "nova") {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          console.log(result);
        }
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    console.log(dados);
  };

  const handleDelete = (id: number) => {
    //resolvendo o erro de no-restricted-globals do ESLINT
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Deseja apagar o registro?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvar={handleSubmit(handleSave)}
          aoClicarEmSalvarEFechar={handleSubmit(handleSave)}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
      <form ref={formRef} onSubmit={handleSubmit(handleSave)}>
        <VTextField name="nomeCompleto" control={control} />
        <VTextField name="email" control={control} />
        <VTextField name="cidadeId" control={control} />
        <VTextField name="endereco.rua" control={control} />
        <VTextField name="endereco.numero" control={control} />
      </form>
    </LayoutBaseDePagina>
  );
};

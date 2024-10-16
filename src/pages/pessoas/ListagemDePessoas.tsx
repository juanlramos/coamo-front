import { useEffect, useMemo } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useSearchParams } from "react-router-dom";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    PessoasService.getAll(1, busca).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
         console.log(result)
      }
    });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoMudarTextoBusca={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
          mostrarInputBusca
        />
      }
    >
      teste
    </LayoutBaseDePagina>
  );
};

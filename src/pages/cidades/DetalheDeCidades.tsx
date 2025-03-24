import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Grid2, Paper, Typography } from "@mui/material";
import * as yup from "yup";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { VTextField, VForm } from "../../shared/forms";

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheDeCidades: React.FC = () => {
  //regatando informações da url (esse ID tem que ser o mesmo que foi passado na rota)
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const { control, handleSubmit, reset, setError } = VForm<IFormData>();
  const [titulo, setTitulo] = useState(
    id === "nova" ? "Nova Cidade" : "Editar Cidade"
  );

  useEffect(() => {
    if (id != "nova") {
      setIsLoading(true);

      CidadesService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          setNome(result.nome);
          setTitulo(result.nome);
          reset({
            nome: result.nome,
          });
        }
      });
    } else {
      setTitulo("Nova Cidade");
      reset({
        nome: "",
      });
    }
  }, [id]);

  const handleSave = (isSaveAndClose: boolean) => (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false }) //valida todos os campos e retorna todos os erros encontrados
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === "nova") {
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              setTitulo(dadosValidados.nome);
              if (isSaveAndClose) {
                navigate("/cidades");
              } else {
                navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
        } else {
          CidadesService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              setTitulo(dadosValidados.nome);
              if (isSaveAndClose) {
                navigate("/cidades");
              } else {
                navigate(`/cidades/detalhe/${id}`);
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};

        errors.inner.forEach((errors) => {
          if (!errors.path) return;

          validationErrors[errors.path] = errors.message;
        });

        Object.keys(validationErrors).forEach((field) => {
          setError(field as any, {
            message: validationErrors[field],
          });
        });
      });
  };

  const handleDelete = (id: number) => {
    //resolvendo o erro de no-restricted-globals do ESLINT
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Deseja apagar o registro?")) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/cidades");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={titulo}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvar={handleSubmit(handleSave(false))}
          aoClicarEmSalvarEFechar={handleSubmit(handleSave(true))}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/cidades/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/cidades")}
        />
      }
    >
      <form ref={formRef} onSubmit={handleSubmit(handleSave(false))}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid2 container direction="column" padding={2} spacing={2}>
            <Grid2>
              <Typography variant="h6">Geral</Typography>
            </Grid2>

            {isLoading ? (
              <Grid2>
                <CircularProgress variant="indeterminate" />
              </Grid2>
            ) : (
              <>
                <Grid2 container direction="row" spacing={2}>
                  <Grid2
                    sx={{
                      width: {
                        xs: "100%", // Para telas pequenas
                        md: "75%", // Para telas médias
                        lg: "50%", // Para telas grandes
                        xl: "25%", // Para telas extra grandes
                      },
                    }}
                  >
                    <VTextField
                      fullWidth
                      label="Nome"
                      name="nome"
                      control={control}
                    />
                  </Grid2>
                </Grid2>
              </>
            )}
          </Grid2>
        </Box>
      </form>
    </LayoutBaseDePagina>
  );
};

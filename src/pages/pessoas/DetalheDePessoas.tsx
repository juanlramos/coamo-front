import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Grid2, Paper, Typography } from "@mui/material";
import * as yup from "yup";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VTextField, VForm } from "../../shared/forms";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required(),
});

export const DetalheDePessoas: React.FC = () => {
  //regatando informações da url (esse ID tem que ser o mesmo que foi passado na rota)
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const { control, handleSubmit, reset, setError } = VForm<IFormData>();
  const [titulo, setTitulo] = useState(
    id === "nova" ? "Nova Pessoa" : "Editar Pessoa"
  );

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
          setTitulo(result.nomeCompleto);
          reset({
            nomeCompleto: result.nomeCompleto,
            email: result.email,
            cidadeId: result.cidadeId,
          });
        }
      });
    } else {
      setTitulo("Nova Pessoa");
      reset({
        nomeCompleto: "",
        email: "",
        cidadeId: 0,
      });
    }
  }, [id]);

  const handleSave = (isSaveAndClose: boolean) => (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false }) //valida todos os campos e retorna todos os erros encontrados
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === "nova") {
          PessoasService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              setTitulo(dadosValidados.nomeCompleto);
              if (isSaveAndClose) {
                navigate("/pessoas");
              } else {
                navigate(`/pessoas/detalhe/${result}`);
              }
            }
          });
        } else {
          PessoasService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              setTitulo(dadosValidados.nomeCompleto);
              if (isSaveAndClose) {
                navigate("/pessoas");
              } else {
                navigate(`/pessoas/detalhe/${id}`);
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
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
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
                      label="Nome Completo"
                      name="nomeCompleto"
                      control={control}
                    />
                  </Grid2>
                </Grid2>

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
                      label="E-mail"
                      name="email"
                      control={control}
                    />
                  </Grid2>
                </Grid2>

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
                      label="Cidade"
                      name="cidadeId"
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

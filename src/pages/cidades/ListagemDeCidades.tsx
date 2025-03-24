import { useEffect, useMemo, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  IListagemCidade,
  CidadesService,
} from "../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../shared/hooks";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  TableFooter,
  Pagination,
  IconButton,
  Icon,
  Divider,
} from "@mui/material";
import { Environment } from "../../shared/environment";
import { FiTrash2 } from "react-icons/fi";
import { TfiPencil } from "react-icons/tfi";

export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(1000);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || 1);
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(pagina, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [busca, pagina, debounce]);

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Deseja apagar o registro?")) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          setRows((oldRows) => {
            return [...oldRows.filter((oldRow) => oldRow.id !== id)];
          });
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoMudarTextoBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
          aoClicarEmNovo={() => navigate("/cidades/detalhe/nova")}
          mostrarInputBusca
        />
      }
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={100}>Ações</TableCell>
                <TableCell>Nome</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <Icon>
                          <FiTrash2 />
                        </Icon>
                      </IconButton>

                      <IconButton
                        onClick={() => navigate(`/cidades/detalhe/${row.id}`)}
                      >
                        <Icon>
                          <TfiPencil />
                        </Icon>
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.nome}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    {Environment.LISTAGEM_VAZIA}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Pagination
                      page={pagina}
                      count={Math.ceil(
                        totalCount / Environment.LIMITE_DE_LINHAS
                      )}
                      onChange={(_, newPage) =>
                        setSearchParams(
                          { busca, pagina: newPage.toString() },
                          { replace: true }
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </LayoutBaseDePagina>
  );
};

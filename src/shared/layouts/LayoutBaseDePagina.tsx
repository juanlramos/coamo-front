import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps{
    children: React.ReactNode;
    titulo: string;
    barraDeFerramentas?: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
    const { toggleDrawerOpen } = useDrawerContext();
    
    return(
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="center" padding={1} gap={1} height={theme.spacing( smDown? 6: mdDown? 8 : 12)}>
                { smDown && <IconButton onClick={toggleDrawerOpen}>
                    <Icon>
                    <RxHamburgerMenu />
                    </Icon>
                </IconButton>}

                <Typography
                variant={smDown? "h5" : mdDown? "h4": "h3"}
                component="h1"
                whiteSpace="nowrap"     //testo grande não quebrar linha
                overflow="hidden"       //quando o texto passar do elemento ele corta o texto
                textOverflow="ellipsis" // ja que o texto que passou sumiu, fica com "..." no final
                >
                    {titulo}
                </Typography>
            </Box>

            { barraDeFerramentas && (
            <Box>
                {barraDeFerramentas}
            </Box>)}

            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    );
}
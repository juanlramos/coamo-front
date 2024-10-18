import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { matchRoutes, useMatch, useNavigate, useResolvedPath } from "react-router";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";


interface IListItemLinkProps {
    label: string;
    icon: React.ReactNode; //para ultilizar um icone do react icons tem que ter esse tipo
    to: string;
    onClick?: () => void;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);   //essa e a debaixo eh pra saber se estamos na rota informada.
    const match = useMatch({path: resolvedPath.pathname, end: false});

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };
    
    return(
        <ListItemButton selected={!!match} onClick={handleClick}>
        <ListItemIcon>
            <Icon>
                {icon}
            </Icon>
        </ListItemIcon>
        <ListItemText primary={label}/>
    </ListItemButton>
    );
};

interface IMenuLateralProps {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm")); //da true ou false pra const se for menor que sm

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
    const {toggleTheme, themeName} = useAppThemeContext();

    return(
        <>
        <Drawer open={isDrawerOpen} variant={smDown? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
            <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" >
                <Box width="100%" height={theme.spacing(20)} display="flex" justifyContent="center" alignItems="center">
                    <Avatar 
                    sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                    variant="circular">
                        <FaCircleUser size={100}/>
                    </Avatar>
                </Box>

                <Divider />

                <Box flex={1}>
                    <List component="nav">
                        {drawerOptions.map(drawerOptions => (
                            <ListItemLink
                            key={drawerOptions.path}
                            icon={drawerOptions.icon}
                            label={drawerOptions.label}
                            to={drawerOptions.path}
                            onClick={smDown ? toggleDrawerOpen : undefined}
                        />
                        ))}
                    </List>
                </Box>

                <Box >
                    <List component="nav">
                        <ListItemButton onClick={toggleTheme}>
                            <ListItemIcon>
                                <Icon>
                                    {
                                        themeName === "light" ? <MdDarkMode /> : <MdLightMode />
                                    }
                                </Icon>
                            </ListItemIcon>
                            <ListItemText primary="Alternar Tema"/>
                        </ListItemButton>
                    </List>
                </Box>

            </Box>
        </Drawer>

        <Box height="100vh" marginLeft={smDown? 0 : theme.spacing(28)}>
            {children}
        </Box>
      </>
    );
}
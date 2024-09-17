import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { IoMdHome } from "react-icons/io";


interface IMenuLateralProps {
    children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
    const theme = useTheme();

    return(
        <>
        <Drawer open={true} variant="permanent">
            <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" >
                <Box width="100%" height={theme.spacing(20)} display="flex" justifyContent="center" alignItems="center">
                    <Avatar 
                    sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                    variant="circular" src="https://avatars.githubusercontent.com/u/95597422?v=4"/>
                </Box>

                <Divider />

                <Box flex={1}>
                    <List component="nav">
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>
                                    <IoMdHome fontSize="23px"/>
                                </Icon>
                            </ListItemIcon>
                            <ListItemText primary="Pagina Inicial"/>
                        </ListItemButton>
                    </List>
                </Box>

            </Box>
        </Drawer>

        <Box height="100vh" marginLeft={theme.spacing(28)}>
            {children}
        </Box>
      </>
    );
}
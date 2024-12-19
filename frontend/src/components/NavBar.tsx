import React, {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useRouter} from "next/router";
import {IconButton, Link} from "@mui/material";
import {getToken, removeToken} from "@/utils/tokenService";


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;


export default function NavBar(props: Props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();
    const token = getToken();
    const signOut = () => {
        removeToken();
        router.replace('/');
    }

    const navItems:{name: string, visible: boolean, onClick: ()=>void}[] = [
        {name: 'Profile', visible: token!==null, onClick: () => router.push("/profile")},
        {name: 'Login', visible: token===null, onClick: () => router.push("/auth/login")},
        {name: 'Register', visible: token===null, onClick: () => router.push("/auth/register")},
        {name: 'Sign Out', visible: token!==null, onClick: signOut}
    ];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                <Link href="/" color="inherit" underline="none">
                    AeroTran
                </Link>
            </Typography>
            <Divider/>
            <List>
                {navItems.filter((value) => value.visible).map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton onClick={item.onClick} sx={{textAlign: 'center'}}>
                            <ListItemText primary={item.name}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }}}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
                        <Link href="/" color="inherit" underline="none">
                            AeroTran
                        </Link>
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.filter((value) => value.visible).map((item) => (
                            <Button key={item.name} onClick={item.onClick} sx={{color: '#fff'}}>
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </>
    );
}
import React, {ReactNode} from "react";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import ErrorView from "@/components/ErrorView";
import NavBar from "@/components/NavBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";

export default function MainLayout({children, loading, error}: {
    children: ReactNode,
    loading: boolean,
    error: string | null
}) {

    if (loading) return <Loading/>;

    return (
        <Box sx={{display: 'flex', flexDirection: "column",gap: 10}}>
            <CssBaseline />
            <NavBar/>
            <Box component="main" sx={{p: 3}}>
                <ErrorView error={error}/>
                <main>{children}</main>
            </Box>
            {/*<Footer/>*/}
        </Box>
    );
}
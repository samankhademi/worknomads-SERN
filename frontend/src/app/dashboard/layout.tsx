"use client"
import * as React from 'react';
import {ReactNode} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AppbarHeader from "@/components/dashboard/dashboardElements/AppbarHeader";
import AppDrawer from "@/components/dashboard/dashboardElements/AppDrawer";
import {ProfileForm} from '@/components/dashboard/forms/Porfile';
import {ChangePasswordForm} from '@/components/dashboard/forms/ChangePassword';
import {UseAppGuard} from "@/providers/AppGuard";
function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth: number = 240;

export default function Dashboard({children}:{children: ReactNode}) {
    const [open, setOpen] = React.useState(true);
    const {userModalOpen, setUserModalOpen, passwordModalOpen, setPasswordModalOpen} = UseAppGuard()

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
            <Box className='flex min-h-screen'>
                <CssBaseline />
                <AppbarHeader drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} open={open} />
                <AppDrawer drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} open={open} />
                <Box
                    component="main"
                    className='flex grid-rows-1 pt-[80px] justify-between flex-1'
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} className='my-4 !flex flex-col justify-between flex-1'>
                        {children}
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
                <ProfileForm open={userModalOpen} setOpen={(state) => setUserModalOpen(state)}  />
                <ChangePasswordForm open={passwordModalOpen} setOpen={(state) => setPasswordModalOpen(state)}  />
            </Box>
    );
}
"use client"

import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Person4Icon from '@mui/icons-material/Person4';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";
import {routers} from "@/core";
import {UseAppGuard} from "@/providers/AppGuard";
import {RoleEnum} from "@/queries";

export function mainListItems() {
    const { user } = UseAppGuard()
    return <>
        <Link href={routers.DASHBOARD}>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItemButton>
        </Link>
        <Link href={routers.BOOKS}>
            <ListItemButton disabled={user?.role !== RoleEnum.ADMIN}>
                <ListItemIcon>
                    <LibraryBooksIcon/>
                </ListItemIcon>
                <ListItemText primary="Books"/>
            </ListItemButton>
        </Link>
        <Link href={routers.USERS}>
            <ListItemButton disabled={user?.role !== RoleEnum.ADMIN}>
                <ListItemIcon>
                    <GroupIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
            </ListItemButton>
        </Link>
        <ListItemButton disabled>
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Orders"/>
        </ListItemButton>
        <ListItemButton disabled>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Customers"/>
        </ListItemButton>
        <ListItemButton disabled>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reports"/>
        </ListItemButton>
        <ListItemButton disabled>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Integrations"/>
        </ListItemButton>
    </>
}

export function userItems() {
    const {user, handleLogout, setUserModalOpen, setPasswordModalOpen} = UseAppGuard()
    return <>
            <ListItemButton
                onClick={() => {
                    setUserModalOpen(true)
                }}
            >
                <ListItemIcon>
                    <Person4Icon/>
                </ListItemIcon>
                <ListItemText primary={`Welcome ${user?.firstName}`}/>
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    setPasswordModalOpen(true)
                }}
            >
                <ListItemIcon>
                    <PasswordIcon/>
                </ListItemIcon>
                <ListItemText primary="Change Password"/>
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Logout"/>
            </ListItemButton>
    </>
}

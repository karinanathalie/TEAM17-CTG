import { Box, CSSObject, IconButton, List, styled, Theme, Typography, useTheme } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from "react";
import MuiDrawer from '@mui/material/Drawer';
import { SITEMAP } from "./config";
import SitemapItem from "./SitemapItem";
import { BROWN } from "../helpers/colors";
import Divider from '@mui/material/Divider';
import Logo from '../Logo';

const DRAWER_WIDTH = 280;

const openedMixin = (theme : Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { 
    shouldForwardProp: (prop) => prop !== 'open' }
)( ({ theme, open }) => ({
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));


const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <Box>
            <Drawer variant='permanent' open={open}>
            <DrawerHeader>
                <IconButton
                    onClick={() => setOpen(!open)}
                >
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            {open && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Logo />
                    </Box>
                )}
            <Divider />
            <List>
                {SITEMAP.map((item) => (
                    <SitemapItem key={item.key} item={item} isDrawerOpen={open}/>
                ))}
            </List>
            <Divider />

            </Drawer>
        </Box>
    )
}

export default Sidebar
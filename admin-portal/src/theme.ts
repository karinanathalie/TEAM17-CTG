import { createTheme } from '@mui/material';
import { BLUE, BROWN, LIGHT_BROWN, YELLOW } from './helpers/colors';
import { useEffect, useMemo, useState } from 'react';

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
}

const DEFAULT_THEME_MODE = ThemeMode.DARK;

const THEME_MODE_KEY = 'ThemeMode';

const FONTS = [
    // 'Poppins',
    'Roboto', 
    'sans-serif',
    'Open Sans',
]

const isDarkTheme = () => {
    return window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false;
}

export const useThemeMode = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        const storedTheme = localStorage.getItem(THEME_MODE_KEY);
        if (storedTheme && Object.values(ThemeMode).includes(storedTheme as ThemeMode)) {
            return storedTheme as ThemeMode;
        }
        return isDarkTheme() ? ThemeMode.DARK : ThemeMode.LIGHT;
    });

    useEffect(() => {
        localStorage.setItem(THEME_MODE_KEY, themeMode);
    }, [themeMode]);

    return [themeMode, setThemeMode] as const;
};



export const getThemeFromMode = (themeMode : ThemeMode) =>
    createTheme({
        typography: {
            fontFamily: FONTS.join(','),
            button: {
                textTransform: 'none',
            },
        },
        palette: {
            mode: themeMode,
            ...(themeMode === ThemeMode.DARK
                ? {
                    primary: {
                        main: BLUE,
                    },
                    secondary: {
                        main: LIGHT_BROWN,
                    },
                    background: {
                        paper: '#424242',
                        default: '#303030',
                    },
                }
                : {
                    primary: {
                        main: YELLOW,
                    },
                    secondary: {
                        main: BROWN,
                    },
                    // background: {
                    //     paper: '#424242',
                    //     // default: LIGHT_BROWN,
                    // },
                }
            )
        },
    });

export const useTheme = () => {
    const storedTheme = localStorage.getItem(THEME_MODE_KEY) as ThemeMode;

    const theme = useMemo(() => {
        const newTheme = getThemeFromMode(storedTheme);
        return newTheme;
    }, [storedTheme]);

    return theme;
};
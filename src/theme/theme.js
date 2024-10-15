import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Color Design Token
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            background: {
                default: "#141B2D", // Latar belakang gelap
            },
            primary: {
                main: "#FFFFFF", // Putih
            },
            white: {
                main: "#343A46", // Abu-abu terang
            },
            purple: {
                main: "#8280FF", // Ungu
                opacity: 0.34, // 34%
            },
            green: {
                main: "#4AD991", // Hijau
                opacity: 0.34, // 34%
            },
            darkGreen: {
                main: "#00B69B", // Hijau tua
            },
            yellow: {
                main: "#F3B31A", // Kuning
                opacity: 0.34, // 34%
            },
            red: {
                main: "#FF9066", // Merah
                opacity: 0.34, // 34%
            },
            darkRed: {
                main: "#F93C65", // Merah tua
            },
            blue: {
                main: "#1693CD", // Biru
            },
            orange: {
                main: "#FF9066", // Orange
            },
            darkOrange: {
                main: "#FC7900", // Orange tua
            },
            darkBlue: {
                main: "#0B77B7", // Biru tua (lebih gelap)
            },
            lineBlue: {
                main: "#2B33F9", // Garis biru
            },
            darkBlueShade: {
                main: "#1A1D3B", // Biru gelap
            },
            lightGrey: {
                main: "#444444", // Abu gelap
            },
            buttonlogin: {
                main: "#013E69"
            }
        }
    : {
        // Warna untuk mode terang di sini
        background: {
            default: "#EBDFD7", // background
        },
        primary: {
            main: "#000000", // hitam
        },
        white: {
            main: "#FFFFFF", // putih
        },
        purple: {
            main: "#8280FF", // ungu
            opacity: 0.34, // 34%
        },
        green: {
            main: "#4AD991", // hijau
            opacity: 0.34, // 34%
        },
        darkGreen: {
            main: "#00B69B", // hijau tua
        },
        yellow: {
            main: "#F3B31A", // kuning
            opacity: 0.34, // 34%
        },
        red: {
            main: "#FF9066", // merah
            opacity: 0.34, // 34%
        },
        darkRed: {
            main: "#F93C65", // merah tua
        },
        blue: {
            main: "#1693CD", // biru
        },
        orange: {
            main: "#FF9066", // orange
        },
        darkOrange: {
            main: "#FC7900", // orange tua
        },
        darkBlue: {
            main: "#1814F3", // biru tua
        },
        lineBlue: {
            main: "#2B33F9", // line biru
        },
        darkBlueShade: {
            main: "#343C6A", // biru gelap
        },
        lightGrey: {
            main: "#606060", // abu
        },
        buttonlogin: {
            main: "#F3B31A"
        }
    }),
});

// mui theme setting
export const themeSetting = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.primary.main,
                    },
                    secondary: {
                        main: colors.lightGrey.main, // Contoh untuk warna sekunder
                    },
                    neutral: {
                        dark: colors.darkGreen.main, // Contoh untuk warna netral
                        main: colors.lightGrey.main, // Contoh warna abu
                        light: colors.white.main, // Contoh warna putih
                    },
                    background: {
                        default: colors.background.default,
                    },
                    border: {
                        main: colors.white.main, // Warna border untuk dark mode
                    },
                } 
                : {
                    primary: {
                        main: colors.primary.main,
                    },
                    secondary: {
                        main: colors.green.main,
                    },
                    neutral: {
                        dark: colors.darkGreen.main,
                        main: colors.lightGrey.main,
                        light: colors.white.main,
                    },
                    background: {
                        default: colors.background.default,
                    },
                    border: {
                        main: '#000000', // Warna border untuk light mode
                    },
                }),
        },
        typography: {
            fontFamily: ["Roboto", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 20,
            },
        h5: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext ({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        ()=> ({
            toggleColorMode: () => setMode ((prev) => (prev === "light" ? "dark" : "light"))
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

    return [theme, colorMode];
}

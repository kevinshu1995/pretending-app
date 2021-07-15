module.exports = {
    mode: "jit",
    purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            center: true,
            padding: "1rem",
        },
        extend: {
            fontFamily: {
                // almarai: ["Almarai", "sans-serif"],
                // "public-sans": ["Public Sans", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            colors: {
                // 灰
                "dove-gray": {
                    50: "#f8f8f8",
                    100: "#f1f1f1",
                    200: "#dcdcdc",
                    300: "#c7c7c7",
                    400: "#9c9c9c",
                    500: "#727272",
                    600: "#676767",
                    700: "#565656",
                    800: "#444444",
                    900: "#383838",
                },
                // 深灰
                shark: {
                    50: "#f4f4f4",
                    100: "#e9e9ea",
                    200: "#c9c9ca",
                    300: "#a8a8aa",
                    400: "#67666a",
                    500: "#26252A",
                    600: "#222126",
                    700: "#1d1c20",
                    800: "#171619",
                    900: "#131215",
                },
                // 深綠
                "english-holly": {
                    50: "#f3f4f3",
                    100: "#e7eae7",
                    200: "#c2cac4",
                    300: "#9daaa0",
                    400: "#546a58",
                    500: "#0A2A11",
                    600: "#09260f",
                    700: "#08200d",
                    800: "#06190a",
                    900: "#051508",
                },
                // 淺綠
                malachite: {
                    50: "#f5fdf7",
                    100: "#eafaee",
                    200: "#cbf3d5",
                    300: "#acecbc",
                    400: "#6dde8a",
                    500: "#2FD058",
                    600: "#2abb4f",
                    700: "#239c42",
                    800: "#1c7d35",
                    900: "#17662b",
                },
                // 洪
                "sunset-orange": {
                    50: "#fff6f5",
                    100: "#ffedec",
                    200: "#ffd1ce",
                    300: "#ffb5b1",
                    400: "#ff7e77",
                    500: "#FF463C",
                    600: "#e63f36",
                    700: "#bf352d",
                    800: "#992a24",
                    900: "#7d221d",
                },
                // 橘
                "orange-peel": {
                    50: "#fffaf3",
                    100: "#fff6e7",
                    200: "#ffe7c2",
                    300: "#ffd99d",
                    400: "#febd54",
                    500: "#FEA00A",
                    600: "#e59009",
                    700: "#bf7808",
                    800: "#986006",
                    900: "#7c4e05",
                },
            },
            keyframes: {
                slideIn: {
                    "0%": { transform: "translateY(100%)" },
                    "100%": { transform: "translateY(0)" },
                },
            },
            animation: {
                "slide-DownIn": "slideIn .5s ease-in-out",
                "slide-DownOut": "slideIn .5s ease-in-out reverse",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

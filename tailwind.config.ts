import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                // Simplified color palette
                background: "#FFFFFF",
                foreground: "#000000",

                primary: {
                    DEFAULT: "#000000",
                    foreground: "#FFFFFF",
                },

                secondary: {
                    DEFAULT: "#F5F5F5",
                    foreground: "#000000",
                },

                accent: {
                    DEFAULT: "#0066FF",
                    foreground: "#FFFFFF",
                },

                muted: {
                    DEFAULT: "#F8F8F8",
                    foreground: "#666666",
                },

                border: "#E5E5E5",
                card: "#FFFFFF",
            },
            fontFamily: {
                sans: ["var(--font-inter)", ...fontFamily.sans],
                mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
            },
            // Remove complex animations and effects
            animation: {
                "fade-in": "fadeIn 0.3s ease-in-out",
                "slide-up": "slideUp 0.4s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
};

export default config;
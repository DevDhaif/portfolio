// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
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
                // Main background colors
                background: {
                    DEFAULT: "#030712", // Very dark gray (almost black)
                    secondary: "#111827", // Slightly lighter dark gray
                },
                // Text colors
                text: {
                    primary: "#F9FAFB", // Almost white
                    secondary: "#9CA3AF", // Medium gray
                    accent: "#10B981", // Emerald green
                },
                // Accent colors
                accent: {
                    primary: "#10B981", // Emerald green
                    secondary: "#3B82F6", // Blue
                    tertiary: "#8B5CF6", // Purple
                    subtle: "rgba(16, 185, 129, 0.1)", // Transparent emerald
                },
                // Border colors
                border: {
                    DEFAULT: "#1F2937", // Dark gray
                    hover: "#374151", // Medium gray
                },
                // Card colors
                card: {
                    DEFAULT: "#111827", // Dark gray
                    hover: "#1F2937", // Slightly lighter
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", ...fontFamily.sans],
                mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
                display: ["var(--font-cabinet-grotesk)", ...fontFamily.sans],
            },
            boxShadow: {
                'glow': '0 0 20px rgba(16, 185, 129, 0.2)',
                'glow-lg': '0 0 30px rgba(16, 185, 129, 0.3)',
            },
            keyframes: {
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: 0.4 },
                    "50%": { opacity: 0.8 },
                },
                "scroll-x": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-100%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pulse-glow": "pulse-glow 3s ease-in-out infinite",
                "scroll-x": "scroll-x 20s linear infinite",
            },
            backgroundImage: {
                'grid-pattern': 'radial-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px)',
                'gradient-noise': 'url("/images/noise.png")',
            },
            backgroundSize: {
                'grid': '30px 30px',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
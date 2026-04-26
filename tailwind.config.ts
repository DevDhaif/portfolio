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
            padding: "1.5rem",
            screens: {
                "2xl": "1440px",
            },
        },
        extend: {
            colors: {
                // Dev-bold palette: deep slate ground, white ink, electric cyan signal + lime accent.
                paper: {
                    DEFAULT: "#0A0A0B",   // pure neutral near-black
                    raised: "#121214",    // cards
                    sunken: "#050506",    // wells / terminal
                    panel: "#0E0E10",     // alt ground
                },
                ink: {
                    DEFAULT: "#F2F2F2",
                    muted: "#A3A3A8",
                    faint: "#525258",
                    inverse: "#0A0A0B",
                },
                rule: {
                    DEFAULT: "#1E1E22",
                    strong: "#2F2F35",
                },
                signal: {
                    DEFAULT: "#00FF66",   // electric green ,  only signal
                    soft: "#008A37",
                    glow: "rgba(0, 255, 102, 0.22)",
                },
                accent: {
                    DEFAULT: "#FFFFFF",   // pure white ,  secondary highlight
                    ink: "#0A0A0B",
                },
                danger: "#FF4949",

                // Backwards-compat aliases used across legacy components.
                background: {
                    DEFAULT: "#0A0A0B",
                    secondary: "#121214",
                },
                text: {
                    primary: "#F2F2F2",
                    secondary: "#A3A3A8",
                    accent: "#00FF66",
                },
                border: {
                    DEFAULT: "#1E1E22",
                    hover: "#2F2F35",
                },
                card: {
                    DEFAULT: "#121214",
                    hover: "#17171B",
                    foreground: "#F2F2F2",
                },

                // shadcn primitive aliases
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                foreground: "hsl(var(--foreground))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", ...fontFamily.sans],
                mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
                display: ["var(--font-display)", "var(--font-geist-sans)", ...fontFamily.sans],
            },
            letterSpacing: {
                tightest: "-0.05em",
                tighter: "-0.035em",
            },
            boxShadow: {
                "signal": "0 0 0 1px rgba(0, 255, 102, 0.4), 0 8px 32px -8px rgba(0, 255, 102, 0.5)",
                "card": "0 1px 0 0 rgba(255,255,255,0.03), 0 8px 32px -16px rgba(0,0,0,0.75)",
                "card-hover": "0 1px 0 0 rgba(0, 255, 102, 0.45), 0 12px 48px -16px rgba(0, 255, 102, 0.3)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "scroll-x": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
                "blink": {
                    "0%, 49%": { opacity: "1" },
                    "50%, 100%": { opacity: "0" },
                },
                "pulse-signal": {
                    "0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 255, 102, 0.55)" },
                    "50%": { boxShadow: "0 0 0 6px rgba(0, 255, 102, 0)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "scroll-x": "scroll-x 40s linear infinite",
                "blink": "blink 1.1s steps(1) infinite",
                "pulse-signal": "pulse-signal 2.4s ease-in-out infinite",
            },
            backgroundImage: {
                "grid-dev": "linear-gradient(rgba(0,255,102,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,0.05) 1px, transparent 1px)",
                "grid-fade": "radial-gradient(ellipse at center, rgba(0,255,102,0.12) 0%, transparent 70%)",
                "scanline": "repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)",
            },
            backgroundSize: {
                "grid-dev": "44px 44px",
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;

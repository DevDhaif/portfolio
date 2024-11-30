// src/context/global-context.tsx
"use client"

import { createContext, useContext } from 'react';

// Constants
const SOCIAL_LINKS = {
    GITHUB: "https://github.com/devdhaif",
    LINKEDIN: "https://linkedin.com/in/devdhaif",
    EMAIL: "devdhaif@gmail.com"
} as const;

const AUTHOR = {
    name: "Dhaifallah",
    role: "Full Stack Developer",
    location: "Riyadh, Saudi Arabia",
    phone: "+966536547818",
} as const;

const PROJECT_LINKS = {
    neelaincom: {
        github: "https://github.com/devdhaif/neelaincom",
        live: "https://neelaincom.com"
    },
    // ... other projects
} as const;

// Create context with all your constants
type GlobalContextType = {
    social: typeof SOCIAL_LINKS;
    author: typeof AUTHOR;
    projects: typeof PROJECT_LINKS;
}

const GlobalContext = createContext<GlobalContextType>({
    social: SOCIAL_LINKS,
    author: AUTHOR,
    projects: PROJECT_LINKS
});

// Provider component
export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const value = {
        social: SOCIAL_LINKS,
        author: AUTHOR,
        projects: PROJECT_LINKS
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

// Custom hook to use the context
export function useGlobal() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
}
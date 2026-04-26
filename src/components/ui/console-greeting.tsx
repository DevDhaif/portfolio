"use client";

import { useEffect } from "react";

const banner = String.raw`
  ____  _   _    _    ___ _____ ___ _____  _____
 |  _ \| | | |  / \  |_ _|  ___|_ _|_   _||  ___|
 | | | | |_| | / _ \  | || |_   | |  | |  | |_
 | |_| |  _  |/ ___ \ | ||  _|  | |  | |  |  _|
 |____/|_| |_/_/   \_\___|_|   |___| |_|  |_|
`;

export function ConsoleGreeting() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        // eslint-disable-next-line no-console
        console.log(
            `%c${banner}`,
            "color: #00FF66; font-family: monospace; font-weight: bold;"
        );
        // eslint-disable-next-line no-console
        console.log(
            "%cFront-end engineer. Hi there 👋  →  devdhaif@gmail.com",
            "color: #A3A3A8; font-family: monospace; font-size: 12px;"
        );
        // eslint-disable-next-line no-console
        console.log(
            "%cSource: https://github.com/devdhaif/portfolio",
            "color: #A3A3A8; font-family: monospace; font-size: 12px;"
        );
    }, []);

    return null;
}

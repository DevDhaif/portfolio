"use client";

import { useEffect, useRef } from "react";

export function Noise() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            generateNoise();
        };

        // Generate noise pattern
        const generateNoise = () => {
            // Get canvas dimensions
            const { width, height } = canvas;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Create imageData object
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            // Generate noise
            for (let i = 0; i < data.length; i += 4) {
                // Random value between 0-255
                const value = Math.floor(Math.random() * 255);

                // Set RGB values (all same for grayscale)
                data[i] = value;     // R
                data[i + 1] = value; // G
                data[i + 2] = value; // B

                // Set alpha (very transparent)
                data[i + 3] = 5; // A (0-255) - lower value = more transparent
            }

            // Put image data back to canvas
            ctx.putImageData(imageData, 0, 0);
        };

        // Initial setup
        resize();
        window.addEventListener("resize", resize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-overlay"
            aria-hidden="true"
        />
    );
}
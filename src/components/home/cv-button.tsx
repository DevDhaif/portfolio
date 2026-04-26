"use client";

import { useState } from "react";
import { ArrowDownToLine, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CVButton({ className }: { className?: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/cv/Dhaifallah_Ahmed_Resume Feb 2026.docx-3.pdf");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Dhaifallah-Alfarawi-CV.pdf");
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading CV:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            disabled={isLoading}
            className={cn("btn-signal", className)}
        >
            {isLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
                <ArrowDownToLine className="h-3.5 w-3.5" />
            )}
            {isLoading ? "downloading" : "resume.pdf"}
        </button>
    );
}

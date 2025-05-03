import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-border  /10 px-3 py-2",
                    "text-sm text-base",
                    "placeholder:text-gray-500",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-colors duration-200",
                    "resize-none",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
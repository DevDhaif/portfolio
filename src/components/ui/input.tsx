import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-border  /10 px-3 py-2",
                    "text-base",
                    "placeholder:text-gray-500",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-colors duration-200",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "sm" | "lg";
}

export function Button({
    className,
    variant = "default",
    size = "default",
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50",
                {
                    "bg-primary text-primarygray-500 hover:bg-primary/90":
                        variant === "default",
                    "border border-input bg-background hover:  bg- hover:text-accentgray-500":
                        variant === "outline",
                    "hover:  bg- hover:text-accentgray-500": variant === "ghost",
                    "h-10 px-4 py-2": size === "default",
                    "h-9 px-3": size === "sm",
                    "h-11 px-8": size === "lg",
                },
                className
            )}
            {...props}
        />
    );
}

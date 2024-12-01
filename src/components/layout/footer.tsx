// src/components/layout/footer.tsx
export function Footer() {
    return (
        <div className="flex h-16 items-center justify-between">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} DevDhaif. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
                <a
                    href="https://github.com/devdhaif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    GitHub
                </a>
                <a
                    href="https://linkedin.com/in/devdhaif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    LinkedIn
                </a>
            </div>
        </div>
    )
}
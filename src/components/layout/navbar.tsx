// src/components/layout/navbar.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CVButton } from "../home/cv-button"

const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    return (
        <motion.nav
            className="flex h-16 items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Logo */}
            <a className="text-2xl font-bold" href="/">
                DevDhaif
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {item.name}
                    </a>
                ))}
                <CVButton />
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </Button>
        </motion.nav>
    )
}
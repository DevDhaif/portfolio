
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CVButton } from "../home/cv-button"
import { useState } from "react"
import { X, Menu } from "lucide-react"
import Link from "next/link"

const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <motion.nav
                className="flex h-16 items-center justify-between"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Logo */}
                <Link className="text-2xl font-bold" href="/">
                    DevDhaif
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <CVButton />
                </div>

                {/* Mobile Menu Button */}
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </motion.nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed bg-gray-50 inset-x-0 top-16 bg-background border-t md:hidden">
                    <div className="flex flex-col p-6 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-2">
                            <CVButton />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
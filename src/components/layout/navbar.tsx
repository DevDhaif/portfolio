"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CVButton } from "../home/cv-button"
import { useState } from "react"
import { X, Menu, ExternalLink } from "lucide-react"
import Link from "next/link"

const navItems = [
    { name: "Home", href: "/#" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/blog", isExternal: true },
    { name: "Contact", href: "/#contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-50"
        >
            <motion.nav
                className="flex h-20 items-center justify-between  backdrop-blur-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="relative group px-6"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative"
                    >
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-blue-100 to-white bg-clip-text text-white">
                            DevDhaif
                        </span>
                        <div className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-blue-400 via-blue-300 to-transparent group-hover:w-full transition-all duration-500 ease-out rounded-full" />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 px-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="group relative px-3 py-2"
                        >
                            <div className="flex items-center gap-1">
                                <span className="text font-medium text-blue-100/70 group-hover:text-blue-100 transition-colors duration-300">
                                    {item.name}
                                </span>
                                {item.isExternal && (
                                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                )}
                            </div>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-blue-400/50 via-blue-300/50 to-transparent rounded-full" />
                        </Link>
                    ))}
                    <div className="pl-4 border-l border-blue-900/30">
                        <CVButton />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="md:hidden mr-6 p-2 hover:bg-blue-900/10 rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.1 }}
                        className="text-blue-100/70 hover:text-blue-100 transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.div>
                </motion.button>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                            transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                            transition: { duration: 0.2, ease: "easeIn" }
                        }}
                        className="fixed inset-x-0 top-20 bg-gradient-to-b from-[#000020]/20 to-[#000040]/20 backdrop-blur-xl border-t border-blue-900/20 md:hidden"
                    >
                        <motion.div
                            className="flex flex-col px-6 py-6 gap-4"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: { transition: { staggerChildren: 0.07 } },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                        >
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.name}
                                    variants={{
                                        open: {
                                            y: 0,
                                            opacity: 1,
                                            transition: { duration: 0.3 }
                                        },
                                        closed: {
                                            y: 20,
                                            opacity: 0,
                                            transition: { duration: 0.2 }
                                        }
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center justify-between py-3 px-4 rounded-lg text-blue-100/70 hover:text-blue-100 hover:bg-blue-900/10 transition-all duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="text-lg font-medium">{item.name}</span>
                                        {item.isExternal && <ExternalLink className="w-4 h-4 opacity-50" />}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                variants={{
                                    open: {
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.3 }
                                    },
                                    closed: {
                                        y: 20,
                                        opacity: 0,
                                        transition: { duration: 0.2 }
                                    }
                                }}
                                className="pt-4 border-t border-blue-900/20"
                            >
                                <CVButton />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
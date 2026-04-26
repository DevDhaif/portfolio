"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { CVButton } from "../home/cv-button";

function Monogram() {
    return (
        <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-md border border-rule bg-paper-raised transition-all group-hover:border-signal"
        >
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-ink transition-colors group-hover:text-signal"
            >
                <path d="M3 6 L9 12 L3 18" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                <path d="M13 6 H21 V18 H13" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                <path d="M13 12 H18" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>
        </span>
    );
}

const navItems = [
    { href: "/#about", label: "about", index: "01" },
    { href: "/#projects", label: "work", index: "02" },
    { href: "/#skills", label: "stack", index: "03" },
    { href: "/#blog", label: "blog", index: "04" },
    { href: "/#experience", label: "experience", index: "05" },
    { href: "/#certificates", label: "certs", index: "06" },
    { href: "/#contact", label: "contact", index: "07" },
];

export function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeId, setActiveId] = useState<string>("home");
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8);

            // Pick the section whose top has crossed a line ~25% down the viewport.
            // Falls back to the most-visible section if none has crossed yet.
            const sections = Array.from(
                document.querySelectorAll<HTMLElement>("section[id]")
            );
            const offset = window.innerHeight * 0.25;
            let current = "home";
            let bestTop = -Infinity;
            let maxVisible = 0;
            let mostVisible = "home";
            sections.forEach((s) => {
                const r = s.getBoundingClientRect();
                const visible =
                    Math.max(0, Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top));
                if (visible > maxVisible) {
                    maxVisible = visible;
                    mostVisible = s.id;
                }
                if (r.top - offset <= 0 && r.top > bestTop) {
                    bestTop = r.top;
                    current = s.id;
                }
            });
            setActiveId(bestTop === -Infinity ? mostVisible : current);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const isActive = (href: string) => {
        if (href === "/#blog" && pathname?.startsWith("/blog")) return true;
        if (href.startsWith("/#")) return activeId === href.slice(2);
        return false;
    };

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
                scrolled
                    ? "bg-paper/80 backdrop-blur-md border-b border-rule"
                    : "bg-transparent"
            )}
        >
            <div className="container-dev">
                <div className="flex h-16 items-center justify-between md:h-[72px]">
                    <Link href="/" className="group flex items-center gap-2.5">
                        <Monogram />
                        <span className="hidden font-mono text-sm tracking-tight text-ink sm:inline">
                            devdhaif<span className="text-signal animate-blink">_</span>
                        </span>
                    </Link>

                    <nav aria-label="Primary" className="hidden md:block">
                        <ul className="flex items-center gap-1">
                            {navItems.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "group relative inline-flex items-baseline gap-1.5 rounded-md px-3 py-2",
                                                "transition-colors duration-150",
                                                active
                                                    ? "text-signal"
                                                    : "text-ink-muted hover:text-ink"
                                            )}
                                        >
                                            <span className="font-mono text-[10px] tracking-[0.18em] text-ink-faint group-hover:text-signal transition-colors">
                                                {item.index}
                                            </span>
                                            <span className="font-mono text-sm">
                                                {item.label}
                                            </span>
                                            {active && (
                                                <motion.span
                                                    layoutId="nav-active"
                                                    className="absolute inset-x-3 -bottom-px h-px bg-signal"
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="ml-3">
                                <CVButton />
                            </li>
                        </ul>
                    </nav>

                    <button
                        type="button"
                        className="md:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center text-ink"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="md:hidden fixed inset-0 top-16 z-40 bg-paper border-t border-rule"
                    >
                        <div className="container-dev py-10">
                            <ul className="space-y-1">
                                {navItems.map((item, i) => (
                                    <motion.li
                                        key={item.label}
                                        initial={{ opacity: 0, x: 16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.25, delay: i * 0.04 }}
                                        className="border-b border-rule"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="flex items-baseline justify-between py-5 group"
                                        >
                                            <span className="display text-3xl font-bold tracking-tight text-ink group-hover:text-signal transition-colors">
                                                {item.label}
                                            </span>
                                            <span className="font-mono text-xs text-ink-faint">
                                                {item.index}
                                            </span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                            <div className="mt-10">
                                <CVButton className="w-full" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

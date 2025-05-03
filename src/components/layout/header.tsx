"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight, ExternalLink } from "lucide-react";

const navItems = [
    { href: "/#", label: "Home", exact: true },
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#skills", label: "Skills" },
    { href: "/blog", label: "Blog", exact: true },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();

    const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.98]);
    const headerBlur = useTransform(scrollY, [0, 50], [0, 8]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 20);
            const headerHeight = 10;
            if (scrollPosition < 100 && pathname === '/') {
                setActiveSection('');
                return;
            }

            const sections = document.querySelectorAll('section[id]');
            let currentSection = null;
            let maxVisibility = 0;

            sections.forEach((section) => {
                const sectionElement = section as HTMLElement;
                const rect = sectionElement.getBoundingClientRect();

                const viewportHeight = window.innerHeight;
                const visibleTop = Math.max(0, rect.top);
                const visibleBottom = Math.min(viewportHeight, rect.bottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                const visibilityScore = visibleHeight + (rect.top < headerHeight ? 1000 : 0);

                if (visibilityScore > maxVisibility) {
                    maxVisibility = visibilityScore;
                    currentSection = section.id;
                }
            });

            setActiveSection(currentSection);
        };

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || !href.startsWith('/#')) return;

            e.preventDefault();
            const targetId = href.substring(2);
            const element = document.getElementById(targetId);

            if (element) {
                setIsOpen(false);

                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                });

                window.history.pushState(null, '', href);

                setActiveSection(targetId);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("click", handleAnchorClick);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleAnchorClick);
        };
    }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const isActive = (href: string, exact = false) => {
        if (href === '/blog' && pathname === '/blog') return true;

        if (href === '/blog' && pathname.startsWith('/blog/')) return false;

        if (href === '/' && activeSection === null && pathname === '/') return true;

        if (href.startsWith('/#')) {
            const sectionId = href.substring(2);
            return sectionId === activeSection;
        }

        return false;
    };

    return (
        <motion.header
            ref={headerRef}
            style={{
                opacity: headerOpacity,
                backdropFilter: `blur(${headerBlur}px)`,
            }}
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled
                    ? "py-3 bg-background/60 border-b border-border/60 shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
                    : "py-5 bg-transparent"
            )}
        >
            <div className="container max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-20 group">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                            className="flex items-center"
                        >
                            <span className="text-xl font-display font-bold relative transition-all duration-300 group-hover:pr-1">
                                <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-700">
                                    DevDhaif
                                </span>
                               
                            </span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center">
                        <ul className="flex items-center gap-1 bg-card/50 rounded-full px-2 py-1 backdrop-blur-sm border border-border/50">
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.label}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, type: "spring", stiffness: 150 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1",
                                            isActive(item.href, item.exact)
                                                ? "text-background bg-accent-primary"
                                                : "text-text-primary hover:text-text-accent hover:bg-card"
                                        )}
                                        aria-current={isActive(item.href, item.exact) ? 'page' : undefined}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.li>
                            ))}

                            {/* CTA Button */}
                            <motion.li
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: navItems.length * 0.05, type: "spring", stiffness: 150 }}
                            >
                                <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    className="ml-2 bg-accent-primary/10 text-accent-primary border-accent-primary/30 hover:bg-accent-primary hover:text-background transition-all duration-300"
                                >
                                    <Link href="/#contact" className="flex items-center gap-1 font-medium">
                                        Get In Touch
                                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </Link>
                                </Button>
                            </motion.li>
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            className="relative z-20 p-2 text-text-primary group"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isOpen ? "close" : "open"}
                                    initial={{ opacity: 0, scale: 0.8, rotate: isOpen ? -90 : 90 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, rotate: isOpen ? 90 : -90 }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 250 }}
                                    className={cn(
                                        "p-2 rounded-full transition-colors duration-300",
                                        isOpen
                                            ? "bg-red-500/10 text-red-500"
                                            : "bg-card/80 hover:bg-card text-accent-primary group-hover:text-accent-secondary"
                                    )}
                                >
                                    {isOpen ? (
                                        <X className="h-5 w-5" />
                                    ) : (
                                        <Menu className="h-5 w-5" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop overlay with blur effect */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Mobile menu panel */}
                        <motion.div
                            id="mobile-menu"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background/95 backdrop-blur-xl shadow-2xl z-20 md:hidden border-l border-border/20"
                        >
                            {/* Menu header with logo and close button */}
                            <div className="sticky top-0 flex items-center justify-between px-6 py-5 border-b border-border/30 bg-background/80 backdrop-blur-md">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl font-display font-bold"
                                >
                                    <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent">
                                        DevDhaif
                                    </span>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, rotate: 45 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    transition={{ delay: 0.1 }}
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full bg-card/80 text-accent-primary hover:bg-accent-primary hover:text-background transition-all duration-200"
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5" />
                                </motion.button>
                            </div>

                            {/* Menu content */}
                            <div className="h-[calc(100%-70px)] overflow-auto py-6 px-6">
                                <nav className="flex flex-col h-full">
                                    {/* Navigation links with bold styling */}
                                    <ul className="space-y-1 mb-auto">
                                        {navItems.map((item, index) => (
                                            <motion.li
                                                key={item.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.08, type: "spring" }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "group flex items-center py-4 px-4 text-xl font-display font-semibold rounded-lg transition-all duration-200",
                                                        isActive(item.href, item.exact)
                                                            ? "bg-accent-primary/15 text-accent-primary"
                                                            : "text-text-primary hover:bg-card hover:text-accent-primary"
                                                    )}
                                                    onClick={() => setIsOpen(false)}
                                                    aria-current={isActive(item.href, item.exact) ? 'page' : undefined}
                                                >
                                                    <div className="relative flex items-center">
                                                        {/* Active indicator dot */}
                                                        {isActive(item.href, item.exact) && (
                                                            <motion.span
                                                                layoutId="activeDot"
                                                                className="absolute -left-4 w-1.5 h-1.5 rounded-full bg-accent-primary"
                                                            />
                                                        )}
                                                        {item.label}
                                                    </div>
                                                    <motion.div
                                                        className="ml-auto"
                                                        initial={{ opacity: 0, x: -5 }}
                                                        animate={isActive(item.href, item.exact) ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronRight className="h-5 w-5 text-accent-primary" />
                                                    </motion.div>
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent my-6" />

                                    {/* CTA section */}
                                    <div className="space-y-6">
                                        {/* Bold heading */}
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: navItems.length * 0.08 + 0.1 }}
                                            className="text-sm font-medium text-text-secondary px-4"
                                        >
                                            Ready to start your project?
                                        </motion.p>

                                        {/* CTA Button with enhanced styling */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: navItems.length * 0.08 + 0.2 }}
                                        >
                                            <Button
                                                asChild
                                                size="lg"
                                                className="w-full bg-accent-primary hover:bg-accent-primary/90 text-background font-bold text-lg"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <Link href="/#contact" className="flex items-center justify-center gap-2">
                                                    Get In Touch
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </motion.div>

                                        {/* Social links with improved styling */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: navItems.length * 0.08 + 0.3 }}
                                            className="flex justify-center gap-4 mt-8 pt-6 border-t border-border/20"
                                        >
                                            {[
                                                { name: 'GitHub', icon: 'G' },
                                                { name: 'LinkedIn', icon: 'L' },
                                                { name: 'Twitter', icon: 'T' }
                                            ].map((social, idx) => (
                                                <motion.a
                                                    key={social.name}
                                                    href="#"
                                                    whileHover={{ y: -3, scale: 1.05 }}
                                                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-lg font-bold text-accent-primary hover:border-accent-primary hover:bg-accent-primary/10 transition-all duration-200"
                                                >
                                                    {social.icon}
                                                </motion.a>
                                            ))}
                                        </motion.div>
                                    </div>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
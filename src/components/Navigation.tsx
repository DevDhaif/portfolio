"use client"

import NavLink from "./NavLink";
import type { LucideIcon } from 'lucide-react';

export type MenuItem = {
    title: string;
    icon: LucideIcon;
    href: string;
}

interface NavigationProps {
    menuItems: MenuItem[];
}

function Navigation({ menuItems }: NavigationProps) {
    return (
        <nav className="flex-1 px-4 py-2 space-y-1">
            {menuItems.map((item) => (
                <NavLink
                    key={item.href}
                    href={item.href}
                    Icon={item.icon}
                    title={item.title}
                />
            ))}
        </nav>
    )
}

export default Navigation;
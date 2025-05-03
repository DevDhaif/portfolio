"use client"

import NavLink from "./NavLink";
import type { LucideIcon } from 'lucide-react';

import {
    LayoutDashboard,
    FolderKanban,
    Award,
    FileText
} from 'lucide-react'

export type MenuItem = {
    title: string;
    icon: LucideIcon;
    href: string;
}


function Navigation() {
    const menuItems: MenuItem[] = [
        { title: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { title: 'Projects', icon: FolderKanban, href: '/admin/projects' },
        { title: 'Certificates', icon: Award, href: '/admin/certificates' },
        { title: 'Blog Posts', icon: FileText, href: '/admin/blog' },
    ]
    
    return (
        <nav className="flex-1 text-white px-4 py-2 space-y-1">
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
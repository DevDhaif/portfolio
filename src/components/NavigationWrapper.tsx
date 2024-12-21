"use client"

import {
    LayoutDashboard,
    FolderKanban,
    Award,
    FileText
} from 'lucide-react'
import Navigation from './Navigation'
import type { MenuItem } from './Navigation'

const menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { title: 'Projects', icon: FolderKanban, href: '/admin/projects' },
    { title: 'Certificates', icon: Award, href: '/admin/certificates' },
    { title: 'Blog Posts', icon: FileText, href: '/admin/blog' },
]

export function NavigationWrapper() {
    return <Navigation menuItems={menuItems} />
}
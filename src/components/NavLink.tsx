"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavLinkProps {
    href: string;
    Icon: LucideIcon;
    title: string;
}

function NavLink({ href, Icon, title }: NavLinkProps) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg 
                       transition-all duration-200 group
                       ${isActive
                    ? 'bg-blue-500/10 text-blue-500 border-r-2 border-blue-500'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
        >
            <Icon className={`w-5 h-5 transition-colors
                            ${isActive
                    ? 'text-blue-500'
                    : 'text-gray-400 group-hover:text-white'
                }`}
            />
            <span className="font-medium">{title}</span>
            {isActive && (
                <div className="ml-auto">
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                </div>
            )}
        </Link>
    )
}

export default NavLink;
'use server'
import { signOut } from '@/app/auth/actions'
import { LogOut } from 'lucide-react'
import React from 'react'

function LogoutButton() {
    return (
        <div className="absolute bottom-0 w-72 p-4 border-t border-gray-200 dark:border-gray-800">
            <form action={async () => {
                'use server'
                await signOut()
            }}>
                <button
                    type="submit"
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-600 dark:text-gray-300 
                                             hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </form>
        </div>
    )
}

export default LogoutButton
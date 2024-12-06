// app/login/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { login, signup } from '@/app/auth/actions'

export default function LoginPage() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const message = searchParams.get('message')

    return (
        <div className="max-w-md mx-auto mt-10">
            {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {message && (
                <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
                    {message}
                </div>
            )}
            <form className="space-y-4">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        formAction={login}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Log in
                    </button>
                    <button
                        formAction={signup}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}
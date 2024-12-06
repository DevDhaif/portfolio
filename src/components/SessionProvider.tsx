// components/SessionProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Session } from '@supabase/supabase-js'

interface SessionContextType {
    session: Session | null
    loading: boolean
}

const SessionContext = createContext<SessionContextType>({ session: null, loading: true })

export const useSession = () => useContext(SessionContext)

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            setSession(initialSession)
            setLoading(false)
        })

        // Set up session listener
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (!session) {
                // Show expired session message and redirect
                const message = 'Your session has expired. Please log in again.'
                if (typeof window !== 'undefined') {
                    window.sessionStorage.setItem('sessionExpiredMessage', message)
                }
                router.push('/login')
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <SessionContext.Provider value={{ session, loading }}>
            {children}
        </SessionContext.Provider>
    )
}
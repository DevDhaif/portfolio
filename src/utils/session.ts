
import { createClient } from '@/utils/supabase/client'

export const refreshSession = async () => {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (!session && !error) {

        return { expired: true }
    }

    if (error) {
        console.error('Session error:', error)
        return { error }
    }

    return { session }
}
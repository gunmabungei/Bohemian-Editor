import { useState, useEffect } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Supabase } from '@/api/Supabase.ts'
import { isAllowedUser } from '@/api/auth.ts'

export type AuthStatus = 'loading' | 'unauthenticated' | 'unauthorized' | 'authorized'

export function useAuth() {
	const [session, setSession] = useState<Session | null>(null)
	const [status, setStatus] = useState<AuthStatus>('loading')

	const checkAccess = async (session: Session | null) => {
		if (!session) {
			setStatus('unauthenticated')
			return
		}
		const discordId = session.user.user_metadata?.provider_id as string | undefined
		if (!discordId) {
			setStatus('unauthorized')
			return
		}
		const allowed = await isAllowedUser(discordId)
		setStatus(allowed ? 'authorized' : 'unauthorized')
	}

	useEffect(() => {
		Supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
			checkAccess(session)
		})

		const { data: { subscription } } = Supabase.auth.onAuthStateChange(
			(_event, session) => {
				setSession(session)
				checkAccess(session)
			}
		)

		return () => subscription.unsubscribe()
	}, [])

	return { session, status }
}

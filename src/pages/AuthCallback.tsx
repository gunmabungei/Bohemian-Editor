import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Center, Loader } from '@mantine/core'
import { Supabase } from '@/api/Supabase.ts'

export default function AuthCallback() {
	const navigate = useNavigate()

	useEffect(() => {
		const { data: { subscription } } = Supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event === 'SIGNED_IN' && session) {
					navigate('/', { replace: true })
				}
			}
		)
		return () => subscription.unsubscribe()
	}, [navigate])

	return (
		<Center h='100vh'>
			<Loader />
		</Center>
	)
}

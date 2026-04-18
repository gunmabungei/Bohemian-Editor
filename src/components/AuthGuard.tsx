import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Center, Loader } from '@mantine/core'
import { useAuth } from '@/hooks/useAuth.ts'

export function AuthGuard({ children }: { children: ReactNode }) {
	const { status } = useAuth()

	if (status === 'loading') {
		return (
			<Center h='100vh'>
				<Loader />
			</Center>
		)
	}
	if (status === 'unauthenticated') return <Navigate to='/login' replace />
	if (status === 'unauthorized') return <Navigate to='/unauthorized' replace />
	return <>{children}</>
}

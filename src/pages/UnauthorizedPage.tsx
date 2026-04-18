import { useNavigate } from 'react-router-dom'
import { Button, Center, MantineProvider, Stack, Text, Title } from '@mantine/core'
import { signOut } from '@/api/auth.ts'

export default function UnauthorizedPage() {
	const navigate = useNavigate()

	const handleSignOut = async () => {
		await signOut()
		navigate('/login', { replace: true })
	}

	return (
		<MantineProvider>
			<Center h='100vh'>
				<Stack align='center' gap='md'>
					<Title order={2}>アクセス権限がありません</Title>
					<Text c='dimmed'>
						このアプリの利用には管理者による承認が必要です
					</Text>
					<Button variant='outline' onClick={handleSignOut}>
						ログアウト
					</Button>
				</Stack>
			</Center>
		</MantineProvider>
	)
}

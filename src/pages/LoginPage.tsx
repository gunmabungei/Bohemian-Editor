import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Center, Stack, Text, Title } from '@mantine/core'
import { IconBrandDiscord } from '@tabler/icons-react'
import { MantineProvider } from '@mantine/core'
import { signInWithDiscord } from '@/api/auth.ts'
import { useAuth } from '@/hooks/useAuth.ts'

export default function LoginPage() {
	const { status } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (status === 'authorized') navigate('/', { replace: true })
	}, [status, navigate])

	return (
		<MantineProvider>
			<Center h='100vh'>
				<Stack align='center' gap='xl'>
					<Title>ぼへみあんエディタ</Title>
					<Text c='dimmed'>編集を始めるにはログインが必要です</Text>
					<Button
						leftSection={<IconBrandDiscord size={20} />}
						color='indigo'
						size='lg'
						onClick={signInWithDiscord}
					>
						Discordでログイン
					</Button>
				</Stack>
			</Center>
		</MantineProvider>
	)
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Paper, Stack, Text, Title } from '@mantine/core'
import { IconBrandDiscord } from '@tabler/icons-react'
import { signInWithDiscord } from '@/api/auth.ts'
import { useAuth } from '@/hooks/useAuth.ts'

const PHOTOS = [
	'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1920&q=80', // 桜（広角）
	'https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?auto=format&fit=crop&w=1920&q=80', // ピンクのユリ
	'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=1920&q=80', // ラベンダー畑
	'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=1920&q=80', // 桜（クローズアップ）
]

export default function LoginPage() {
	const { status } = useAuth()
	const navigate = useNavigate()
	const [bgIndex, setBgIndex] = useState(0)

	useEffect(() => {
		if (status === 'authorized') navigate('/', { replace: true })
	}, [status, navigate])

	useEffect(() => {
		const interval = setInterval(() => {
			setBgIndex(prev => (prev + 1) % PHOTOS.length)
		}, 6000)
		return () => clearInterval(interval)
	}, [])

	return (
		<Box style={{ position: 'fixed', inset: 0 }}>
			{PHOTOS.map((photo, i) => (
				<Box
					key={photo}
					style={{
						position: 'absolute',
						inset: 0,
						backgroundImage: `url(${photo})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						opacity: i === bgIndex ? 1 : 0,
						transition: 'opacity 2s ease-in-out',
					}}
				/>
			))}
			<Box
				style={{
					position: 'relative',
					zIndex: 1,
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '1rem',
				}}
			>
				<Paper
					shadow='xl'
					radius='lg'
					p={40}
					w='100%'
					maw={400}
					style={{
						backgroundColor: 'rgba(255, 255, 255, 0.75)',
						backdropFilter: 'blur(12px)',
						WebkitBackdropFilter: 'blur(12px)',
					}}
				>
					<Stack align='center' gap='lg'>
						<Stack align='center' gap={4}>
							<Title order={2}>ぼへみあんエディタ</Title>
							<Text c='dimmed' size='sm' ta='center'>
								編集を始めるにはログインが必要です
							</Text>
						</Stack>
						<Button
							leftSection={<IconBrandDiscord size={20} />}
							color='indigo'
							size='lg'
							fullWidth
							onClick={signInWithDiscord}
						>
							Discordでログイン
						</Button>
					</Stack>
				</Paper>
			</Box>
		</Box>
	)
}

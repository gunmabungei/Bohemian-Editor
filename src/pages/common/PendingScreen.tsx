import { Box, Skeleton } from '@mantine/core'

const EDITOR_LINES = [
	'88%', '72%', '95%', '61%', '84%',
	'90%', '55%', '78%', '66%', '82%',
	'93%', '70%',
]

export default function PendingScreen(props: { open: boolean }) {
	if (!props.open) return null

	return (
		<Box
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 200,
				background: 'rgba(255, 255, 255, 0.88)',
				backdropFilter: 'blur(2px)',
			}}
		>
			{/* ヘッダー */}
			<Box
				style={{
					height: 60,
					borderBottom: '1px solid #eee',
					display: 'flex',
					alignItems: 'center',
					padding: '0 16px',
					gap: 16,
				}}
			>
				<Box style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
					<Skeleton height={9} width={110} radius='sm' />
					<Skeleton height={11} width={150} radius='sm' />
				</Box>
				<Box style={{ flex: 1 }} />
				<Skeleton height={11} width={52} radius='sm' />
				<Skeleton height={11} width={52} radius='sm' />
				<Skeleton height={11} width={52} radius='sm' />
			</Box>

			{/* ボディ */}
			<Box style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
				{/* サイドバー */}
				<Box
					style={{
						width: 350,
						borderRight: '1px solid #eee',
						padding: 16,
						display: 'flex',
						flexDirection: 'column',
						gap: 8,
					}}
				>
					{[1, 2, 3, 4].map(i => (
						<Skeleton key={i} height={52} radius='sm' />
					))}
					<Box style={{ flex: 1 }} />
					<Box style={{ display: 'flex', gap: 6 }}>
						<Skeleton height={32} radius='sm' style={{ flex: 1 }} />
						<Skeleton height={32} radius='sm' style={{ flex: 1 }} />
						<Skeleton height={32} radius='sm' style={{ flex: 1 }} />
					</Box>
				</Box>

				{/* テキストエディタ */}
				<Box
					style={{
						flex: 1,
						padding: '32px 40px',
						display: 'flex',
						flexDirection: 'column',
						gap: 14,
					}}
				>
					<Skeleton height={16} width='30%' radius='sm' mb={8} />
					{EDITOR_LINES.map((w, i) => (
						<Skeleton key={i} height={11} width={w} radius='sm' />
					))}
				</Box>
			</Box>
		</Box>
	)
}

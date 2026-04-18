import {
	Box,
	Button,
	Center,
	createTheme,
	MantineProvider,
	Paper,
	Stack,
	Title,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchJournalList } from '@/api'

type JournalEntry = {
	id: string
	title: string
}

const theme = createTheme({
	fontFamily: 'Yu Gothic, sans-serif',
	headings: { fontFamily: 'Outfit, sans-serif' },
})

// エディタのレイアウトを模した装飾用背景（APIコールなし）
const LINE_WIDTHS = ['88%', '72%', '91%', '65%', '83%', '55%', '90%', '78%', '62%', '85%', '70%', '93%', '58%', '80%']

function GhostEditor() {
	return (
		<Box
			style={{
				position: 'fixed',
				inset: 0,
				opacity: 0.12,
				filter: 'blur(1.5px)',
				pointerEvents: 'none',
				userSelect: 'none',
			}}
		>
			{/* ヘッダー */}
			<Box style={{
				height: 60,
				borderBottom: '1px solid #999',
				display: 'flex',
				alignItems: 'center',
				padding: '0 20px',
				gap: 24,
				background: 'white',
			}}>
				<Box style={{ flex: 1, height: 13, background: '#aaa', borderRadius: 3 }} />
				{['ファイル', '原稿', '部誌'].map(label => (
					<Box key={label} style={{ width: 52, height: 13, background: '#bbb', borderRadius: 3 }} />
				))}
			</Box>

			{/* ボディ */}
			<Box style={{ display: 'flex', height: 'calc(100vh - 60px)', background: 'white' }}>
				{/* サイドバー */}
				<Box style={{ width: 350, borderRight: '1px solid #ddd', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
					{[100, 85, 90, 78, 88].map((w, i) => (
						<Box key={i} style={{
							height: 52,
							background: i === 0 ? '#ccc' : '#eee',
							borderRadius: 6,
							width: `${w}%`,
						}} />
					))}
					<Box style={{ flex: 1 }} />
					<Box style={{ display: 'flex', gap: 6 }}>
						{[1, 2, 3].map(i => (
							<Box key={i} style={{ flex: 1, height: 32, background: '#ddd', borderRadius: 4 }} />
						))}
					</Box>
				</Box>

				{/* テキストエディタ */}
				<Box style={{ flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
					<Box style={{ height: 18, width: '40%', background: '#ccc', borderRadius: 3, marginBottom: 8 }} />
					{LINE_WIDTHS.map((w, i) => (
						<Box key={i} style={{ height: 11, width: w, background: '#ddd', borderRadius: 2 }} />
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default function SelectPage() {
	const [journalList, setJournalList] = useState<JournalEntry[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		fetchJournalList()
			.then(data => setJournalList(data))
			.catch(err => console.error('Fetching journal list failed', err))
	}, [])

	return (
		<MantineProvider theme={theme}>
			<GhostEditor />
			<Center h='100vh' style={{ position: 'relative', zIndex: 1 }}>
				<Paper shadow='md' radius='md' p='xl' w={340} style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}>
					<Stack align='center' gap='md'>
						<Title order={3}>編集する部誌を選択してください</Title>
						{journalList.map(j => (
							<Button
								key={j.id}
								variant='outline'
								color='gray'
								w='100%'
								onClick={() => navigate(`/edit/${j.id}/works`)}
							>
								{j.title}
							</Button>
						))}
					</Stack>
				</Paper>
			</Center>
		</MantineProvider>
	)
}

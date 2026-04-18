import {
	Button,
	Center,
	createTheme,
	MantineProvider,
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
			<Center h='100vh'>
				<Stack align='center' gap='md'>
					<Title order={3}>編集する部誌を選択してください</Title>
					{journalList.map(j => (
						<Button
							key={j.id}
							variant='outline'
							color='gray'
							w='300px'
							onClick={() => navigate(`/edit/${j.id}/works`)}
						>
							{j.title}
						</Button>
					))}
				</Stack>
			</Center>
		</MantineProvider>
	)
}

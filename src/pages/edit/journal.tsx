import '../../App.css'

import {
	AppShell,
	createTheme,
	Group,
	Image,
	MantineProvider,
	Space,
	Stack,
	Text,
} from '@mantine/core'
import Tabbar from '../common/Tabbar.tsx'
import { ExportModal } from '@/components/features/works/ExportWorks/ExportModal.tsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Journal } from '@/types/Journal.ts'

const theme = createTheme({
	fontFamily: 'Yu Gothic, sans-serif',
	headings: { fontFamily: 'Outfit, sans-serif' },
})

export default function Journal() {
	const journalName = useParams().journalName
	const [journal, setJournal] = useState<Journal>()
	useEffect(() => {
		fetch(`http://localhost:3000/journal/id/${journalName}`)
			.then(response => response.json())
			.then(data => setJournal(data))
			.catch(error => console.error('Fetching data failed', error))
	}, [])
	return (
		<>
			<MantineProvider theme={theme}>
				<AppShell header={{ height: 60 }}>
					<AppShell.Header
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<Tabbar refreshCompontent={setJournal} />
					</AppShell.Header>
					<AppShell.Main
						style={{
							display: 'flex',
							flexDirection: 'column',
							margin: 'auto',
							paddingTop: 60,
						}}
						maw={'520px'}
					>
						<Group>
							<Stack align={'flex-start'}>
								<Space h='1em' />
								<Image
									src='https://placehold.net/400x400.png'
									w='200'
									p='0'
									m='0'
								/>
								<Text>表紙イメージ</Text>
								<Image
									src='https://placehold.net/400x400.png'
									w='200'
									p='0'
									m='0'
								/>
								<Text>背表紙イメージ</Text>
							</Stack>
						</Group>
						<ExportModal />
					</AppShell.Main>
				</AppShell>
			</MantineProvider>
		</>
	)
}

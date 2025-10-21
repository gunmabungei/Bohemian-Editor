import '../App.css'

import { AppShell, createTheme, Group, MantineProvider } from '@mantine/core'
import { WorksList } from './WorksList.tsx'
import { UploadModal } from './modal/UploadModal.tsx'
import { SortModal } from './modal/SortModal.tsx'
import Editor from './Editor.tsx'
import { useDisclosure } from '@mantine/hooks'
import Tabbar from '../Tabbar.tsx'
import { RemoveModal } from './modal/RemoveModal.tsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PendingScreen from './PendingScreen.tsx'
import type { Works } from '../types/Works.ts'
import { fetchAllWorks, fetchWorks } from '../api/fetchWorks.ts'
import { updateWorks } from '../api/saveWorks.ts'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const theme = createTheme({
	fontFamily: 'Yu Gothic, sans-serif',
	headings: { fontFamily: 'Outfit, sans-serif' },
})

const worksPending: Works = {
	body: 'loading...',
	postscript: 'loading...',
	author: 'loading...',
	title: 'loading...',
	pages: 'xxx',
}

export default function EditorUI() {
	const [opened] = useDisclosure()
	const [worksList, setWorksList] = useState<Works[]>([worksPending])
	const [selector, setSelector] = useState(0)
	const [onPending, setOnPending] = useState(false)
	const params = useParams()

	const journal_name = params.journal_name ?? ''

	const handleWorksSelected = (id: number) => {
		loadWorksList()
		setSelector(id - 1)
	}
	function editWorks(works: Works) {
		setWorksList(worksList.map((c, i) => (i == selector ? works : c)))
	}
	useEffect(() => {
		const fetchId = selector
		setOnPending(true)
		loadWorksList()
		fetchWorks(fetchId)
			.then((data: Works) =>
				setWorksList(worksList.map(c => (c.id === fetchId ? data : c)))
			)
			.catch(error => console.error('Fetching data failed', error))
	}, [])

	const saveChanges = updateWorks(worksList[selector], {
		journal: journal_name,
		index: selector,
	})

	function loadWorksList() {
		fetchAllWorks(journal_name ?? 'test')
			.then(data => setWorksList(data))
			.then(() => setOnPending(false))
			.catch(error => console.error('Fetching data failed', error))
	}

	return (
		<>
			<MantineProvider theme={theme}>
				<PendingScreen open={onPending} />
				<AppShell
					header={{ height: 60 }}
					navbar={{
						width: 350,
						breakpoint: 'sm',
						collapsed: { mobile: !opened },
					}}
				>
					<AppShell.Header
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'flex-end',
						}}
					>
						<Tabbar />
					</AppShell.Header>

					<AppShell.Navbar display='flex' p='md'>
						<WorksList
							onClickedButton={handleWorksSelected}
							works={worksList}
							selection={selector}
						/>
						<Group
							mt={'auto'}
							gap='6px'
							grow
							w={'320'}
							style={{ position: 'fixed', bottom: 10 }}
						>
							<UploadModal hookWorksListUpdate={loadWorksList} />
							<RemoveModal />
							<SortModal />
						</Group>
					</AppShell.Navbar>

					<AppShell.Main
						style={{
							display: 'flex',
							flexDirection: 'column',
							margin: 0,
							paddingLeft: 110,
							paddingTop: 60,
							height: '100vh',
						}}
					>
						<Editor
							works={worksList[selector]}
							onSave={saveChanges}
							editWorks={editWorks}
						/>
					</AppShell.Main>
				</AppShell>
			</MantineProvider>
		</>
	)
}

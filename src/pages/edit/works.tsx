import '../../App.css'

import { AppShell, createTheme, Group, MantineProvider } from '@mantine/core'
import { WorksList } from '@/components/layouts/WorksList/WorksList.tsx'
import { UploadModal } from '@/components/features/works/AddWorks/UploadModal.tsx'
import { SortModal } from '@/components/features/works/SortWorks/SortModal.tsx'
import TextEditor from '../../components/layouts/TextEditor/TextEditor.tsx'
import { useDisclosure } from '@mantine/hooks'
import Tabbar from '../common/Tabbar.tsx'
import { RemoveModal } from '@/components/features/works/RemoveWorks/RemoveModal.tsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PendingScreen from '../common/PendingScreen.tsx'
import type { Works } from '@/types/Works.ts'
import { fetchAllWorks, fetchWorks, updateWorks } from '@/api'

const theme = createTheme({
	fontFamily: 'Yu Gothic, sans-serif',
	headings: { fontFamily: 'Outfit, sans-serif' },
})

const worksPending: Works = {
	body: 'loading...',
	postscript: 'loading...',
	author: 'loading...',
	title: 'loading...',
	id: 0,
}

export default function EditorUI() {
	const [opened] = useDisclosure()
	const [worksList, setWorksList] = useState<Works[]>([worksPending])
	const [selectionId, setSelectionId] = useState(0)
	const [onPending, setOnPending] = useState(false)
	const params = useParams()

	const journal_name = params.journal_name ?? ''

	const handleWorksSelected = (id: number) => {
		loadWorksList()
		setSelectionId(id)
	}

	function editWorks(works: Works) {
		setWorksList(worksList.map(w => (w.id === selectionId ? works : w)))
	}

	useEffect(() => {
		const fetchId = selectionId
		setOnPending(true)
		loadWorksList()
		fetchWorks(fetchId)
			.then((data: Works) =>
				setWorksList(worksList.map(c => (c.id === fetchId ? data : c)))
			)
			.catch(error => console.error('Fetching data failed', error))
	}, [])

	const saveChanges = () =>
		updateWorks(worksList[selectionId], {
			journal: journal_name,
			index: selectionId,
		})

	function loadWorksList() {
		fetchAllWorks(journal_name ?? 'test')
			.then(data => setWorksList(data))
			.then(() => setOnPending(false))
			.catch(error => console.error('Fetching data failed', error))
	}

	return (
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
						onSelectedWorks={handleWorksSelected}
						works={worksList}
						selection={selectionId}
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

				<AppShell.Main>
					<TextEditor
						works={worksList[selectionId]}
						onSave={saveChanges}
						editWorks={editWorks}
					/>
				</AppShell.Main>
			</AppShell>
		</MantineProvider>
	)
}

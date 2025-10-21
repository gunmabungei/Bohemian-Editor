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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const theme = createTheme({
	fontFamily: 'Yu Gothic, sans-serif',
	headings: { fontFamily: 'Outfit, sans-serif' },
})

export type Works = {
	id: number
	title: string
	author: string
	pages: string
	body: string
	postscript: string
}

type IWorks = Works & { index: number }

const worksPending: Works = {
	id: 1,
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

	const buttonTriggered = (id: number) => {
		loadWorksList()
		setSelector(id - 1)
	}

	function editWorks(works: Works) {
		setWorksList(worksList.map((c, i) => (i == selector ? works : c)))
	}

	useEffect(() => {
		const fetchId = worksList[selector].id
		setOnPending(true)
		loadWorksList()
		fetch(`${API_BASE_URL}/journal/${params.journal_name}/works/${fetchId}`)
			.then(response => response.json())
			.then((data: IWorks) => {
				setWorksList(
					worksList.map((c, i) => {
						return i === data.index - 1 ? data : c
					})
				)
			})
			.catch(error => console.error('Fetching data failed', error))
	}, [])

	const saveChanges = () => {
		fetch(
			`${API_BASE_URL}/journal/${params.journal_name}/works/${worksList[selector].id}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(worksList[selector]),
			}
		).then(response => console.log(response))
	}

	function loadWorksList() {
		fetch(`${API_BASE_URL}/journal/works_list/${params.journal_name}`)
			.then(response => response.json())
			.then(data => {
				data = data
					.filter((x: IWorks) => x.id != null)
					.map((x: IWorks) => {
						x.pages = 'xxx'
						return x
					})
					.map((x: IWorks) => {
						return { ...x, index: Number(x.index) }
					})
					.map((x: IWorks) => {
						return { ...x, id: Number(x.id) }
					})
				setWorksList(
					data.sort((a: IWorks, b: IWorks) => a.index > b.index)
				)
			})
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
							onClickedButton={buttonTriggered}
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

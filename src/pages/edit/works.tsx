import '../../App.css'
import '@mantine/notifications/styles.css'

import {
	AppShell,
	Button,
	createTheme,
	Group,
	MantineProvider,
	Text,
} from '@mantine/core'
import { Notifications, notifications } from '@mantine/notifications'
import { WorksList } from '@/components/layouts/WorksList/WorksList.tsx'
import { UploadModal } from '@/features/works/AddWorks/UploadModal.tsx'
import { SortModal } from '@/features/works/SortWorks/SortModal.tsx'
import TextEditor from '../../components/layouts/TextEditor/TextEditor.tsx'
import { useDisclosure } from '@mantine/hooks'
import Tabbar from '../common/Tabbar.tsx'
import { RemoveModal } from '@/features/works/RemoveWorks/RemoveModal.tsx'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import PendingScreen from '../common/PendingScreen.tsx'
import type { Works } from '@/types/Works.ts'
import { fetchAllWorks, updateWorks } from '@/api'

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
		setSelectionId(id)
	}

	const savedWorksRef = useRef<Works[]>([])
	const notificationShownRef = useRef(false)

	function editWorks(works: Works) {
		setWorksList(worksList.map(w => (w.id === works.id ? works : w)))
		if (!notificationShownRef.current) {
			notificationShownRef.current = true
			notifications.show({
				id: 'unsaved-changes',
				title: '未保存の変更があります',
				message: (
					<Group gap='xs'>
						<Text size='sm'>変更を保存しますか？</Text>
						<Button
							size='xs'
							variant='filled'
							onClick={() => {
								saveChangesRef.current()
								notifications.hide('unsaved-changes')
								notificationShownRef.current = false
							}}
						>
							保存
						</Button>
						<Button
							size='xs'
							variant='default'
							onClick={() => {
								cancelChangesRef.current()
								notifications.hide('unsaved-changes')
								notificationShownRef.current = false
							}}
						>
							キャンセル
						</Button>
					</Group>
				),
				autoClose: false,
				withCloseButton: true,
				onClose: () => {
					notificationShownRef.current = false
				},
			})
		}
	}

	const loadWorksList = () => {
		setOnPending(true)
		fetchAllWorks(journal_name)
			.then(data => {
				setWorksList(data)
				savedWorksRef.current = data.map(w => ({ ...w }))
			})
			.then(() => setOnPending(false))
			.catch(error => {
				console.error('Fetching data failed', error)
				setOnPending(false)
			})
	}

	const cancelChanges = () => {
		setWorksList(savedWorksRef.current.map(w => ({ ...w })))
	}

	const cancelChangesRef = useRef(cancelChanges)
	cancelChangesRef.current = cancelChanges

	useEffect(() => {
		loadWorksList()
	}, [journal_name])

	const selectedWorks = worksList.find(w => w.id === selectionId) ?? worksList[0]

	const saveChanges = () => {
		const saved = savedWorksRef.current
		const changedWorks = worksList.filter(w => {
			const original = saved.find(s => s.id === w.id)
			if (!original) return true
			return (
				w.title !== original.title ||
				w.author !== original.author ||
				w.body !== original.body ||
				w.postscript !== original.postscript
			)
		})
		for (const w of changedWorks) {
			const index = worksList.findIndex(x => x.id === w.id)
			updateWorks(w, { journal: journal_name, index })
		}
		notifications.hide('unsaved-changes')
		notificationShownRef.current = false
		savedWorksRef.current = worksList.map(w => ({ ...w }))
	}

	const saveChangesRef = useRef(saveChanges)
	saveChangesRef.current = saveChanges

	return (
		<MantineProvider theme={theme}>
			<Notifications position='top-right' />
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
					<Tabbar refreshComponent={loadWorksList} />
				</AppShell.Header>

				<AppShell.Navbar
					p='md'
					style={{ display: 'flex', flexDirection: 'column' }}
				>
					<WorksList
						onSelectedWorks={handleWorksSelected}
						works={worksList}
						selection={selectionId}
					/>
					<Group mt='md' gap='6px' grow>
						<UploadModal hookWorksListUpdate={loadWorksList} />
						<RemoveModal worksList={worksList} onDelete={loadWorksList} />
						<SortModal worksList={worksList} onSort={loadWorksList} />
					</Group>
				</AppShell.Navbar>

				<AppShell.Main
					style={{
						display: 'flex',
						flexDirection: 'column',
						height: '100vh',
					}}
				>
					{selectedWorks ? (
						<TextEditor
							works={selectedWorks}
							editWorks={editWorks}
						/>
					) : (
						<Text p='xl' c='dimmed'>
							原稿がありません。「追加」ボタンから原稿を追加してください。
						</Text>
					)}
				</AppShell.Main>
			</AppShell>
		</MantineProvider>
	)
}

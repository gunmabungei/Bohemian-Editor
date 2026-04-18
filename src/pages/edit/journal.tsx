import '../../App.css'
import '@mantine/notifications/styles.css'

import {
	AppShell,
	Button,
	createTheme,
	Group,
	Image,
	MantineProvider,
	Space,
	Stack,
	Text,
} from '@mantine/core'
import { Notifications, notifications } from '@mantine/notifications'
import Tabbar from '../common/Tabbar.tsx'
import { ExportModal } from '@/features/works/ExportWorks/ExportModal.tsx'
import JournalConfig from '@/components/layouts/JournalConfig/JournalConfig.tsx'
import UploadImageModal from '@/features/journal/UploadImages/UploadImageModal.tsx'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import type { Journal } from '@/types/Journal.ts'
import { saveChanges as saveJournalChanges } from '@/components/layouts/JournalConfig/saveChanges.ts'
import { fetchJournalById } from '@/api'

const theme = createTheme({
	fontFamily: 'Yu Gothic, sans-serif',
	headings: { fontFamily: 'Outfit, sans-serif' },
})

const defaultJournal: Journal = {
	type: 'bohemian',
	season: null,
	id: '',
	title: '',
	cover_url: null,
	backcover_url: null,
	publish_date: new Date(),
	publisher: { name: '', grade: 1, department: 'M' },
}

export default function JournalPage() {
	const params = useParams()
	const journalId = params.journal_name ?? ''
	const [journal, setJournalRaw] = useState<Journal>(defaultJournal)
	const notificationShownRef = useRef(false)
	const loadedRef = useRef(false)
	const savedJournalRef = useRef<Journal>(defaultJournal)
	const journalRef = useRef(journal)
	journalRef.current = journal

	const setJournal = (j: Journal) => {
		setJournalRaw(j)
		if (loadedRef.current && !notificationShownRef.current) {
			notificationShownRef.current = true
			notifications.show({
				id: 'unsaved-journal',
				title: '未保存の変更があります',
				message: (
					<Group gap='xs'>
						<Text size='sm'>変更を保存しますか？</Text>
						<Button
							size='xs'
							variant='filled'
							onClick={() => {
								saveJournalChanges(journalId, journalRef.current)
								notifications.hide('unsaved-journal')
								notificationShownRef.current = false
							}}
						>
							保存
						</Button>
						<Button
							size='xs'
							variant='default'
							onClick={() => {
								setJournalRaw({ ...savedJournalRef.current })
								notifications.hide('unsaved-journal')
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

	useEffect(() => {
		if (!journalId) return
		fetchJournalById(journalId)
			.then(data => {
				if (data && data.title) {
					const publishDate = new Date(
						data.publish_year ?? 2025,
						(data.publish_month ?? 1) - 1,
						data.publish_day ?? 1
					)
					const publisher = {
						name: '',
						grade: 1 as 1 | 2 | 3 | 4 | 5,
						department: 'M' as 'M' | 'E' | 'J' | 'K' | 'C' | 'AP' | 'AE',
					}
					const j: Journal =
						data.category === 1
							? {
									type: 'onepiecepuzzle',
									volume: 1,
									TTSelection: false,
									id: data.id,
									title: data.title,
									cover_url: data.cover_url,
									backcover_url: data.backcover_url,
									publish_date: publishDate,
									publisher,
								}
							: {
									type: 'bohemian',
									season: null,
									id: data.id,
									title: data.title,
									cover_url: data.cover_url,
									backcover_url: data.backcover_url,
									publish_date: publishDate,
									publisher,
								}
					setJournalRaw(j)
					savedJournalRef.current = { ...j }
					loadedRef.current = true
				}
			})
			.catch(error => console.error('Fetching data failed', error))
	}, [journalId])

	return (
		<MantineProvider theme={theme}>
			<Notifications position='top-right' />
			<AppShell header={{ height: 60 }}>
				<AppShell.Header>
					<Tabbar refreshComponent={() => {}} />
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
					<Group align='flex-start' gap='xl' wrap='nowrap'>
						{journal.title ? (
							<JournalConfig
								journal={journal}
								setJournal={setJournal}
							/>
						) : (
							<Text>読み込み中...</Text>
						)}
						<Stack align='flex-start'>
							<Space h='1em' />
							<Image
								src={journal.cover_url ?? 'https://placehold.net/400x400.png'}
								w='200'
							/>
							<Text size='sm'>表紙イメージ</Text>
							<UploadImageModal
								label='表紙画像をアップロード'
								folder='covers'
								onUploaded={url =>
									setJournal({ ...journal, cover_url: url })
								}
							/>
							<Image
								src={journal.backcover_url ?? 'https://placehold.net/400x400.png'}
								w='200'
							/>
							<Text size='sm'>裏表紙イメージ</Text>
							<UploadImageModal
								label='裏表紙画像をアップロード'
								folder='backcovers'
								onUploaded={url =>
									setJournal({ ...journal, backcover_url: url })
								}
							/>
						</Stack>
					</Group>
					<ExportModal />
				</AppShell.Main>
			</AppShell>
		</MantineProvider>
	)
}

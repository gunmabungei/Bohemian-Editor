import { Menu, Tabs, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import NewJournal from '@/features/journal/NewJournal/NewJournal.tsx'
import SelectJournal from '../../components/layouts/JournalList/SelectJournal.tsx'
import { useClickOutside } from '@mantine/hooks'
import { fetchJournalById } from '@/api'
import { IconLogout } from '@tabler/icons-react'
import { signOut } from '@/api/auth.ts'

export default function Tabbar(props: { refreshComponent?: () => void }) {
	const params = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const handleSignOut = async () => {
		await signOut()
		navigate('/login', { replace: true })
	}
	const [isModalOpen, setIsModalOpen] = useState(false)

	const onModalOpen = () => {
		setValue(true)
		setIsModalOpen(true)
	}
	const onModalClose = () => {
		setIsModalOpen(false)
	}

	const ref = useClickOutside(() => {
		if (!isModalOpen) setValue(false)
	})
	const [value, setValue] = useState(false)
	const [journalName, setJournalName] = useState('')

	useEffect(() => {
		if (!params.journal_name) return
		fetchJournalById(params.journal_name)
			.then(data => {
				if (data) setJournalName(data.title)
			})
			.catch(error => console.error('Fetching data failed', error))
	}, [params.journal_name])

	return (
		<>
			<Text style={{ flex: 1 }}>ぼへみあんエディタで編集中: {journalName}</Text>
			<Tabs
				value={location.pathname.split('/')[3]}
				onChange={v => {
					v != 'file'
						? navigate(`/edit/${params.journal_name}/${v}`)
						: setValue(true)
				}}
			>
				<Tabs.List>
					<Tabs.Tab value='file'>ファイル</Tabs.Tab>
					<Tabs.Tab value='works'>原稿</Tabs.Tab>
					<Tabs.Tab value='journal'>部誌</Tabs.Tab>
				</Tabs.List>
			</Tabs>
			<Menu opened={value}>
				<Menu.Dropdown
					ref={ref}
					style={{
						position: 'fixed',
						top: 'var(--app-shell-header-height)',
						zIndex: '150',
					}}
				>
					<NewJournal
						refreshComponent={props.refreshComponent ?? (() => {})}
						onModalOpen={onModalOpen}
						onModalClose={onModalClose}
					/>
					<SelectJournal
						onModalOpen={onModalOpen}
						onModalClose={onModalClose}
					/>
					<Menu.Divider />
					<Menu.Item
						color='red'
						leftSection={<IconLogout size={16} />}
						onClick={handleSignOut}
					>
						ログアウト
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</>
	)
}

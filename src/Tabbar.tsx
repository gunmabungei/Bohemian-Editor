import { Menu, Tabs, Text } from '@mantine/core'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import NewJournal from './file/modal/NewJournal.tsx'
import SelectJournal from './file/modal/SelectJournal.tsx'
import { useClickOutside } from '@mantine/hooks'

export default function Tabbar(props: { refreshCompontent: () => void }) {
	const params = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const onModalOpen = () => {
		setValue(true)
		isModalOpen = true
	}
	const onModalClose = () => {
		isModalOpen = false
	}
	let isModalOpen: boolean = false

	function changeMenu(b: boolean) {
		if (isModalOpen) return
		else setValue(b)
	}

	const ref = useClickOutside(() => changeMenu(false))
	const [value, setValue] = useState(false)
	const [journalName, setJournalName] = useState('')

	const workingJournal = ''
	fetch(`http://localhost:3000/journal/props/byname/${params.journal_name}`)
		.then(res => res.json())
		.then(props => {
			setJournalName(props.title)
		})

	return (
		<>
			<Text>ぼへみあんエディタで編集中: {journalName}</Text>
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
			<Menu opened={value} onChange={changeMenu}>
				<Menu.Dropdown
					ref={ref}
					style={{
						position: 'fixed',
						top: 'var(--app-shell-header-height)',
						zIndex: '150',
					}}
				>
					<NewJournal
						refreshComponent={props.refreshCompontent}
						onModalOpen={onModalOpen}
						onModalClose={onModalClose}
					/>
					<SelectJournal
						onModalOpen={onModalOpen}
						onModalClose={onModalClose}
					/>
				</Menu.Dropdown>
			</Menu>
		</>
	)
}

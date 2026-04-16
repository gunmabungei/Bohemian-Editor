import {
	Button,
	Group,
	Menu,
	Modal,
	Radio,
	Stack,
	TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import type { OverlayEvent } from '../../../common/OverlayEvent.ts'
import { createJournal } from '@/api'

export type ModalClose = {
	closeModal: () => void
}

export default function NewJournal(props: OverlayEvent) {
	const [opened, { open, close }] = useDisclosure(false)
	const [journalType, setJournalType] = useState('')
	const [title, setTitle] = useState('')

	const handleClose = () => {
		props.onModalClose()
		close()
	}

	const handleCreate = async () => {
		if (!title || !journalType) return
		const category = journalType === 'bohe' ? 0 : 1
		const url_name = title.toLowerCase().replace(/\s+/g, '-')
		await createJournal({ title, url_name, category })
		props.refreshComponent()
		handleClose()
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={handleClose}
				title='部誌を新規作成'
			>
				<Stack gap='sm'>
					<Radio.Group
						value={journalType}
						onChange={setJournalType}
						name='journalType'
						label='部誌の種類'
					>
						<Group mt='xs'>
							<Radio value='bohe' label='ぼへみあん' />
							<Radio value='onepuz' label='One Piece Puzzle' />
						</Group>
					</Radio.Group>
					<TextInput
						label='タイトル'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<Group justify={'flex-end'}>
						<Button
							variant='outline'
							color='pink'
							onClick={handleClose}
						>
							取消
						</Button>
						<Button
							variant='outline'
							color='lime'
							onClick={handleCreate}
							disabled={!title || !journalType}
						>
							追加
						</Button>
					</Group>
				</Stack>
			</Modal>

			<Menu.Item
				onClick={_ => {
					props.onModalOpen()
					open()
				}}
			>
				部誌を新規作成
			</Menu.Item>
		</>
	)
}

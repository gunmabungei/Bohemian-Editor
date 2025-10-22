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

export type ModalClose = {
	closeModal: () => void
}

export default function NewJournal(props: OverlayEvent) {
	const [opened, { open, close }] = useDisclosure(false)
	const [value, setValue] = useState('')

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => {
					props.onModalClose()
					close()
				}}
				title='部誌を新規作成'
			>
				<Stack gap='sm'>
					<Radio.Group
						value={value}
						onChange={setValue}
						name='favoriteFramework'
						label='部誌の種類'
					>
						<Group mt='xs'>
							<Radio value='bohe' label='ぼへみあん' />
							<Radio value='onepuz' label='One Piece Puzzle' />
						</Group>
					</Radio.Group>
					<TextInput label='説明' />
					<Group justify={'flex-end'}>
						<Button variant='outline' color='pink'>
							取消
						</Button>
						<Button variant='outline' color='lime'>
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

import { useDisclosure } from '@mantine/hooks'
import { Menu, Modal } from '@mantine/core'
import JournalList from '../../features/journal/JournalList/JournalList.tsx'
import type { OverlayEvent } from '../../common/OverlayEvent.ts'

export default function SelectJournal(props: OverlayEvent) {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => {
					props.onModalClose()
					close()
				}}
				title='部誌を選択'
			>
				<JournalList refreshComponent={props.refreshComponent} />
			</Modal>

			<Menu.Item
				onClick={_ => {
					props.onModalOpen()
					open()
				}}
			>
				部誌を選ぶ
			</Menu.Item>
		</>
	)
}

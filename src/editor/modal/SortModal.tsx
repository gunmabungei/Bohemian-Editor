import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Container } from '@mantine/core'
import DnDList from '../DnDList.tsx'

export function SortModal() {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				size='md'
				title='作品を並び替え'
			>
				<DnDList />
			</Modal>

			<Button
				variant='light'
				onClick={open}
				w='fit-content'
				mt={'auto'}
				radius={0}
			>
				並び替え
			</Button>
		</>
	)
}

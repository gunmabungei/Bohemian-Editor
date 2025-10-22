import { useDisclosure } from '@mantine/hooks'
import { Button, Modal } from '@mantine/core'
import DnDList from '@/components/features/works/SortWorks/DnDList.tsx'

export function RemoveModal() {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				size='md'
				title='作品を削除する'
			>
				<DnDList />
			</Modal>

			<Button
				variant='light'
				onClick={open}
				w='fit-content'
				mt={'auto'}
				radius={0}
				color='pink'
			>
				削除
			</Button>
		</>
	)
}

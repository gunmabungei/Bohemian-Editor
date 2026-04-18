import { useDisclosure } from '@mantine/hooks'
import { Button, Modal } from '@mantine/core'
import DnDList from './DnDList.tsx'
import type { Works } from '@/types/Works.ts'

type SortModalProps = {
	worksList: Works[]
	onSort: () => void
}

export function SortModal({ worksList, onSort }: SortModalProps) {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				size='md'
				title='作品を並び替え'
			>
				<DnDList worksList={worksList} onSort={onSort} close={close} />
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

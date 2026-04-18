import { useDisclosure } from '@mantine/hooks'
import { Button, Modal } from '@mantine/core'
import RemoveList from './RemoveList.tsx'
import type { Works } from '@/types/Works.ts'

type RemoveModalProps = {
	worksList: Works[]
	onDelete: () => void
}

export function RemoveModal({ worksList, onDelete }: RemoveModalProps) {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				size='md'
				title='作品を削除する'
			>
				<RemoveList
					worksList={worksList}
					onDelete={onDelete}
					close={close}
				/>
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

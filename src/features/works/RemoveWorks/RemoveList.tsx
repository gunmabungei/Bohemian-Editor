import { Button, Checkbox, Group, Stack } from '@mantine/core'
import { useState } from 'react'
import type { Works } from '@/types/Works.ts'
import { deleteWorks } from '@/api'
import { useParams } from 'react-router-dom'

type RemoveListProps = {
	worksList: Works[]
	onDelete: () => void
	close: () => void
}

export default function RemoveList({
	worksList,
	onDelete,
	close,
}: RemoveListProps) {
	const [selected, setSelected] = useState<number[]>([])
	const params = useParams()
	const journalName = params.journal_name ?? ''

	const toggleSelection = (id: number) => {
		setSelected(prev =>
			prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
		)
	}

	const handleDelete = async () => {
		for (const id of selected) {
			await deleteWorks(journalName, id)
		}
		onDelete()
		close()
	}

	return (
		<Stack>
			{worksList.map(w => (
				<Checkbox
					key={w.id}
					label={`${w.title} - ${w.author}`}
					checked={selected.includes(w.id)}
					onChange={() => toggleSelection(w.id)}
				/>
			))}
			<Group justify='flex-end'>
				<Button variant='outline' color='gray' onClick={close}>
					取消
				</Button>
				<Button
					variant='filled'
					color='pink'
					disabled={selected.length === 0}
					onClick={handleDelete}
				>
					削除 ({selected.length})
				</Button>
			</Group>
		</Stack>
	)
}

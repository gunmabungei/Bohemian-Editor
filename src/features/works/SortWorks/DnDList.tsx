import '@mantine/core/styles.css'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import cx from 'clsx'
import { Button, Group, Text } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import classes from './DndListHandle.module.css'
import { IconGripVertical } from '@tabler/icons-react'
import type { Works } from '@/types/Works.ts'
import { reorderWorks } from '@/api'
import { useParams } from 'react-router-dom'

type DnDListProps = {
	worksList: Works[]
	onSort: () => void
	close: () => void
}

export default function DnDList({ worksList, onSort, close }: DnDListProps) {
	const params = useParams()
	const [state, handlers] = useListState(worksList)

	const handleSave = async () => {
		const order = state.map(w => w.id)
		await reorderWorks(params.journal_name ?? '', order)
		onSort()
		close()
	}

	const items = state.map((item, index) => (
		<Draggable
			key={String(item.id)}
			index={index}
			draggableId={String(item.id)}
		>
			{(provided, snapshot) => (
				<div
					className={cx(classes.item, {
						[classes.itemDragging]: snapshot.isDragging,
					})}
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<div
						{...provided.dragHandleProps}
						className={classes.dragHandle}
					>
						<IconGripVertical size={18} stroke={1.5} />
					</div>
					<Text className={classes.symbol}>{index + 1}</Text>
					<div>
						<Text>
							{item.title} - {item.author}
						</Text>
					</div>
				</div>
			)}
		</Draggable>
	))

	return (
		<>
			<DragDropContext
				onDragEnd={({ destination, source }) =>
					handlers.reorder({
						from: source.index,
						to: destination?.index || 0,
					})
				}
			>
				<Droppable droppableId='dnd-list' direction='vertical'>
					{provided => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{items}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<Group justify='flex-end' mt='md'>
				<Button variant='outline' color='gray' onClick={close}>
					取消
				</Button>
				<Button variant='filled' onClick={handleSave}>
					保存
				</Button>
			</Group>
		</>
	)
}

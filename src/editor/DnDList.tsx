import '@mantine/core/styles.css';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import classes from './DndListHandle.module.css';
import { IconGripVertical } from '@tabler/icons-react';

export default function DnDList() {
    const data = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    ];

    const [state, handlers] = useListState(data);

    const items = state.map((item, index) => (
        <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
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
                    <Text className={classes.symbol}>{index}</Text>
                    <div>
                        <Text>{item.name}</Text>
                    </div>
                </div>
            )}
        </Draggable>
    ));
    return (
        <DragDropContext
            onDragEnd={({ destination, source }) =>
                handlers.reorder({
                    from: source.index,
                    to: destination?.index || 0,
                })
            }
        >
            <Droppable droppableId='dnd-list' direction='vertical'>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

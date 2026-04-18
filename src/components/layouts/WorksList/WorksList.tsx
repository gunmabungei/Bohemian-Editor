import { ScrollArea, Stack, Text, UnstyledButton } from '@mantine/core'
import type { Works } from '@/types/Works.ts'

export function WorksList(props: {
	works: Works[]
	onSelectedWorks: (id: number) => void
	selection: number
}) {
	if (!props.works.length) {
		return (
			<Text c='dimmed' ta='center' pt='xl'>
				原稿がありません
			</Text>
		)
	}

	return (
		<ScrollArea flex={1} offsetScrollbars>
			<Stack align='stretch' justify='flex-start' gap='4px'>
				{props.works.map(x => {
					const isSelected = props.selection === x.id
					return (
						<UnstyledButton
							key={x.id}
							onClick={() => props.onSelectedWorks(x.id)}
							p='sm'
							style={theme => ({
								borderRadius: theme.radius.sm,
								border: `1px solid ${isSelected ? theme.colors.blue[4] : theme.colors.gray[3]}`,
								backgroundColor: isSelected
									? theme.colors.blue[0]
									: 'white',
								transition: 'background-color 0.15s',
								'&:hover': {
									backgroundColor: isSelected
										? theme.colors.blue[1]
										: theme.colors.gray[0],
								},
							})}
						>
							<Text size='sm' fw={600} truncate='end'>
								{x.title}
							</Text>
							<Text size='xs' c='dimmed' truncate='end'>
								{x.author}
							</Text>
						</UnstyledButton>
					)
				})}
			</Stack>
		</ScrollArea>
	)
}

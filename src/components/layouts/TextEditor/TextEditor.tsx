import ReactCodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { Group, Stack, Text, TextInput, Textarea } from '@mantine/core'
import type { Works } from '@/types/Works.ts'
import './editor.css'

export default function TextEditor(props: {
	works: Works
	editWorks: (works: Works) => void
}) {
	return (
		<Stack gap={0} style={{ flex: 1, minHeight: 0 }}>
			{/* 本文エディタ */}
			<ReactCodeMirror
				value={props.works.body}
				onChange={body =>
					props.editWorks({ ...props.works, body: body })
				}
				extensions={[EditorView.lineWrapping]}
				theme='light'
				className='articleField'
				height='100%'
				width='100%'
			/>

			{/* メタ情報 */}
			<Group
				gap='sm'
				px='sm'
				py='6px'
				align='flex-end'
				wrap='nowrap'
				style={{
					borderTop: '1px solid var(--mantine-color-gray-3)',
				}}
			>
				<Stack gap={0} style={{ flex: 1 }}>
					<Text size='10px' c='dimmed' fw={500}>タイトル</Text>
					<TextInput
						value={props.works.title}
						onChange={e =>
							props.editWorks({
								...props.works,
								title: e.target.value,
							})
						}
						size='sm'
						variant='unstyled'
						styles={{
							input: {
								fontWeight: 600,
								borderBottom: '1px solid var(--mantine-color-gray-3)',
								borderRadius: 0,
							},
						}}
					/>
				</Stack>
				<Stack gap={0} style={{ flexGrow: 0, flexShrink: 0, width: '10em' }}>
					<Text size='10px' c='dimmed' fw={500}>ペンネーム</Text>
					<TextInput
						value={props.works.author}
						onChange={e =>
							props.editWorks({
								...props.works,
								author: e.target.value,
							})
						}
						size='sm'
						variant='unstyled'
						styles={{
							input: {
								borderBottom: '1px solid var(--mantine-color-gray-3)',
								borderRadius: 0,
							},
						}}
					/>
				</Stack>
				<Stack gap={0} style={{ flex: 1 }}>
					<Text size='10px' c='dimmed' fw={500}>あとがき</Text>
					<Textarea
						value={props.works.postscript}
						onChange={e =>
							props.editWorks({
								...props.works,
								postscript: e.target.value,
							})
						}
						size='sm'
						variant='unstyled'
						autosize
						minRows={1}
						maxRows={2}
						styles={{
							input: {
								borderBottom: '1px solid var(--mantine-color-gray-3)',
								borderRadius: 0,
							},
						}}
					/>
				</Stack>
			</Group>
		</Stack>
	)
}

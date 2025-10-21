import { Button, Group, Space, TextInput } from '@mantine/core'

export type CommonAreaProps = {
	formValues: FormData
	onSubmit: () => void
}
export const CommonArea = ({ formValues, onSubmit }: CommonAreaProps) => {
	return (
		<>
			<TextInput
				label='タイトル'
				withAsterisk
				value={formValues.title}
				onChange={event =>
					setFormValue({ ...formValues, title: event.target.value })
				}
				key='title'
			/>
			<TextInput
				label='ペンネーム'
				withAsterisk
				value={formValues.author}
				onChange={event =>
					setFormValue({ ...formValues, author: event.target.value })
				}
				key='author'
			/>
			<TextInput
				label='あとがき'
				value={formValues.postscript}
				onChange={event =>
					setFormValue({
						...formValues,
						postscript: event.target.value,
					})
				}
				key='postscript'
			/>
			<Space h='sm'></Space>
			<Group justify={'flex-end'}>
				<Button variant='outline' color='pink'>
					取消
				</Button>
				<Button variant='outline' color='lime' onClick={onSubmit}>
					追加
				</Button>
			</Group>
		</>
	)
}

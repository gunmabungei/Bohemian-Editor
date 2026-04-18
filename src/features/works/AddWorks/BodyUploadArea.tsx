import { FileInput, Space, Tabs, Textarea } from '@mantine/core'
import type { TabKeys, WorksForm } from './AddWorks.tsx'

type BodyUploadAreaProps = {
	onChangeTabs: (tabs: string | null) => void
	formValues: WorksForm
	setFormValue: (value: WorksForm) => void
	tabs: TabKeys
}

export const BodyUploadArea = ({
	onChangeTabs,
	setFormValue,
	tabs,
	formValues,
}: BodyUploadAreaProps) => {
	return (
		<>
			<Tabs defaultValue='textInput' onChange={onChangeTabs} value={tabs}>
				<Tabs.List>
					<Tabs.Tab value='fileInput'>ファイル</Tabs.Tab>
					<Tabs.Tab value='textInput'>テキスト</Tabs.Tab>
				</Tabs.List>
				<Space h='sm'></Space>
				<Tabs.Panel value='fileInput'>
					<FileInput
						variant='filled'
						description='複数ファイルの送信に対応しています'
						placeholder='クリックでファイルをアップロード'
						accept='text/plain'
						multiple
						value={formValues.files}
						onChange={(files: File[]) => {
							setFormValue({ ...formValues, files: files })
						}}
					/>
				</Tabs.Panel>
				<Tabs.Panel value='textInput'>
					<Textarea
						placeholder='ここに作品をペースト'
						value={formValues.body}
						onChange={event =>
							setFormValue({
								...formValues,
								body: event.target.value,
							})
						}
					/>
				</Tabs.Panel>
			</Tabs>
		</>
	)
}

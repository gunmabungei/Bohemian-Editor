import { useDisclosure } from '@mantine/hooks'
import { Button, Checkbox, Grid, Modal, Stack, Text } from '@mantine/core'
import { useState } from 'react'
import ExportButton from './ExportButton.tsx'

type ExportSections = {
	cover: boolean
	toc: boolean
	body: boolean
	postscript: boolean
	editorial: boolean
	backcover: boolean
}

export function ExportModal() {
	const [opened, { open, close }] = useDisclosure(false)
	const [sections, setSections] = useState<ExportSections>({
		cover: true,
		toc: true,
		body: true,
		postscript: true,
		editorial: true,
		backcover: true,
	})

	const toggle = (key: keyof ExportSections) =>
		setSections(prev => ({ ...prev, [key]: !prev[key] }))

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				size='md'
				title='ファイルをダウンロードする'
			>
				<Stack>
					<Text>書き出すページ</Text>
					<Grid>
						<Grid.Col span={4}>
							<Checkbox
								checked={sections.cover}
								onChange={() => toggle('cover')}
								label='表紙'
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<Checkbox
								checked={sections.toc}
								onChange={() => toggle('toc')}
								label='もくじ'
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<Checkbox
								checked={sections.body}
								onChange={() => toggle('body')}
								label='本文'
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<Checkbox
								checked={sections.postscript}
								onChange={() => toggle('postscript')}
								label='あとがき'
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<Checkbox
								checked={sections.editorial}
								onChange={() => toggle('editorial')}
								label='編集後記'
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<Checkbox
								checked={sections.backcover}
								onChange={() => toggle('backcover')}
								label='背表紙'
							/>
						</Grid.Col>
					</Grid>
					<Text>Wordファイル(.docx)</Text>
					<ExportButton />
					<Text>Pdfファイル(.pdf)</Text>
					<Button variant='filled' color='pink' disabled>
						準備中
					</Button>
				</Stack>
			</Modal>

			<Button variant='default' onClick={open} w='fit-content' mt='1em'>
				エクスポート
			</Button>
		</>
	)
}

import { DocxMerger } from '@spfxappdev/docxmerger'
import { useParams } from 'react-router-dom'
import { Button } from '@mantine/core'

export default function ExportButton() {
	const params = useParams()
	const docx = new DocxMerger()
	const handleDownload = () => {
		fetch(`http://localhost:3000/journal/${params.journal_name}/docx`)
			.then(res => res.json())
			.then(allworks => {
				const binarray = allworks.map(
					(elem: Record<string, unknown>) => Object.values(elem)
				)
				return docx.merge(Object.values(binarray))
			})
			.then(() => docx.save())
			.then((ab: ArrayBuffer) => {
				const url = window.URL.createObjectURL(new Blob([ab]))
				const link = document.createElement('a')
				link.href = url
				link.download = `${params.journal_name ?? 'journal'}.docx`
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				window.URL.revokeObjectURL(url)
			})
			.catch(error =>
				console.error('Export failed', error)
			)
	}

	return (
		<div>
			<Button variant='filled' onClick={handleDownload}>
				エクスポート
			</Button>
		</div>
	)
}

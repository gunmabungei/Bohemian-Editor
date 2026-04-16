import { DocxMerger } from '@spfxappdev/docxmerger'
import { useParams } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function TestUI() {
	const params = useParams()
	const journalName = params.journal_name ?? ''
	const docx = new DocxMerger()
	const handleDownload = () => {
		fetch(`${API_BASE_URL}/journal/${journalName}/docx`)
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
				link.download = `${journalName || 'journal'}.docx`
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				window.URL.revokeObjectURL(url)
			})
			.catch(error => console.error('Export failed', error))
	}

	return (
		<div>
			<button onClick={handleDownload}>ファイルをダウンロード</button>
		</div>
	)
}

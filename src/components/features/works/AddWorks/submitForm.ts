import type { WorksForm } from './AddWorks.tsx'
import readFiles from './readFiles.ts'
import type { SendData } from './SendData.ts'
import { uploadWorks } from '@/api'

export const submitForm = async (journal_name: string, param: WorksForm) => {
	const onFileInput = async () => {
		if (param.files === undefined) return
		const contents = await readFiles(param.files)
		const sendData: SendData[] = contents.map(([b, t]) => {
			return {
				author: 'Not Set',
				postscript: '',
				title: t,
				body: b,
			}
		})
		await uploadWorks(sendData, journal_name)
	}
	const onTextInput = async () => {
		await uploadWorks([param], journal_name)
	}
	return param.files === undefined ? await onFileInput() : await onTextInput()
}

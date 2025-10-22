import { useState } from 'react'
import { submitForm } from './submitForm.ts'
import { useParams } from 'react-router-dom'
import { CommonArea } from './CommonArea.tsx'
import type { Works } from '@/types/Works.ts'
import { BodyUploadArea } from './BodyUploadArea.tsx'

export type WorksForm = Omit<Works, 'id'> & { files?: File[] }
export type TabKeys = 'fileInput' | 'textInput'

type AddWorksProps = { onSubmit: () => void; onComplete: () => void }

export const AddWorks = ({ onSubmit, onComplete }: AddWorksProps) => {
	const param = useParams()
	const [tabs, setTabs] = useState<TabKeys>('textInput')
	const [formData, setFormData] = useState<WorksForm>({
		files: undefined,
		body: '',
		title: '',
		author: '',
		postscript: '',
	})
	const handleClick = () => {
		onSubmit()
		submitForm(param.journal_name ?? 'test', formData).then(onComplete)
	}
	const handleChanges = (tabs: string | null) => {
		if (tabs === 'fileInput' || tabs === 'textInput') {
			setFormData({ ...formData, files: undefined })
			setTabs(tabs)
		}
	}
	return (
		<>
			<BodyUploadArea
				tabs={tabs}
				onChangeTabs={handleChanges}
				formValues={formData}
				setFormValue={setFormData}
			/>
			<CommonArea
				formValues={formData}
				setFormValue={setFormData}
				onSubmit={handleClick}
			/>
		</>
	)
}

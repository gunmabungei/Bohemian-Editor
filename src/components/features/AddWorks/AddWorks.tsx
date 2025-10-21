import { Tabs } from '@mantine/core'
import { useState } from 'react'
import { submitForm } from './submitForm.ts'
import { useParams } from 'react-router-dom'
import { AddWorksForm } from './AddWorksForm.tsx'
import { CommonArea } from './CommonArea.tsx'
import type { Works } from '../../../types/Works.ts'

export type FormParam = Works & { files?: File[] }
export type TabKeys = 'fileInput' | 'textInput'

type AddWorksProps = { onSubmit: () => void; onComplete: () => void }

export const AddWorks = ({ onSubmit, onComplete }: AddWorksProps) => {
	const param = useParams()
	const [tabs, setTabs] = useState<TabKeys>('textInput')
	const [values, setValues] = useState<FormParam>({
		files: undefined,
		body: '',
		title: '',
		author: '',
		postscript: '',
	})
	const handleClick = () => {
		onSubmit()
		submitForm(param.journal_name ?? 'test', values).then(onComplete)
	}
	const handleChanges = (tabs: string | null) => {
		if (tabs === 'fileInput' || tabs === 'textInput') {
			setValues({ ...values, files: undefined })
			setTabs(tabs)
		}
	}
	return (
		<>
			<AddWorksForm
				tabs={tabs}
				onSubmit={handleClick}
				onChangeTabs={handleChanges}
				formValues={values}
				setFormValue={setValues}
			/>
			<CommonArea formValues={values} onSubmit={handleClick} />
		</>
	)
}

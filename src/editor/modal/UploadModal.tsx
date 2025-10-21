import { useDisclosure } from '@mantine/hooks'
import { Button, Modal } from '@mantine/core'
import { AddWorks } from '../../components/features/AddWorks'
import * as React from 'react'
import { useState } from 'react'

export type UploadProgress = 'pending' | 'complete' | 'none'

export function UploadModal() {
	const [progress, setProgress] = useState<UploadProgress>('none')
	const [opened, { open, close }] = useDisclosure(false)
	const progressMap: Record<UploadProgress, UploadProgress> = {
		none: 'pending',
		pending: 'complete',
		complete: 'none',
	}
	const nextProgress = () => setProgress(progressMap[progress])
	const handleOpen = () => {
		setProgress('none')
		open()
	}
	const ModalView: Record<UploadProgress, React.ReactNode> = {
		pending: <>Uploading...</>,
		complete: <>Upload complete</>,
		none: <AddWorks onSubmit={nextProgress} onComplete={nextProgress} />,
	}
	return (
		<>
			<Modal opened={opened} onClose={close} title='作品を追加'>
				{ModalView[progress]}
			</Modal>
			<Button
				variant='light'
				onClick={handleOpen}
				w='fit-content'
				radius={0}
				color='lime'
			>
				追加
			</Button>
		</>
	)
}

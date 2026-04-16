import { Button, FileInput, Group, Image, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { Supabase } from '@/api/Supabase.ts'

type UploadImageModalProps = {
	label?: string
	folder?: string
	onUploaded?: (url: string) => void
}

export default function UploadImageModal({
	label = '表紙画像をアップロード',
	folder = 'covers',
	onUploaded,
}: UploadImageModalProps) {
	const [opened, { open, close }] = useDisclosure(false)
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string>('https://placehold.net/400x400.png')

	const handleFileChange = (f: File | null) => {
		setFile(f)
		if (f) {
			const url = URL.createObjectURL(f)
			setPreview(url)
		}
	}

	const handleSave = async () => {
		if (!file) return
		const fileName = `${folder}/${Date.now()}-${file.name}`
		const { data } = await Supabase.storage.from('images').upload(fileName, file)
		if (data?.path) {
			onUploaded?.(data.path)
		}
		close()
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				size='md'
				title={label}
			>
				<Image src={preview} w='200' size='md' />
				<FileInput
					pt='1em'
					placeholder='ファイルをアップロード'
					variant='filled'
					accept='image/*'
					value={file}
					onChange={handleFileChange}
				/>
				<Group pt='1em' justify={'flex-end'}>
					<Button variant='outline' color='pink' onClick={close}>
						取消
					</Button>
					<Button
						variant='outline'
						color='lime'
						onClick={handleSave}
						disabled={!file}
					>
						保存
					</Button>
				</Group>
			</Modal>

			<Button variant='default' onClick={open} w='fit-content' mt='1em'>
				{label}
			</Button>
		</>
	)
}

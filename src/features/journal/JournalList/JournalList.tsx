import { Button, Stack } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchJournalList } from '@/api'

type Journal = {
	id: string
	title: string
}

export default function JournalList(props: { onSelect?: () => void }) {
	const [journalList, setJournalList] = useState<Journal[]>([])
	const navigate = useNavigate()
	const handleNavigate = (id: string) => {
		props.onSelect?.()
		navigate(`/edit/${id}/works`)
	}

	useEffect(() => {
		fetchJournalList()
			.then(data => setJournalList(data))
			.catch(error => console.error('Fetching data failed', error))
	}, [])

	const toButton = (x: Journal) => (
		<Button
			key={x.id}
			variant='outline'
			color='gray'
			onClick={() => handleNavigate(x.id)}
		>
			{x.title}
		</Button>
	)

	return <Stack>{journalList.map(toButton)}</Stack>
}

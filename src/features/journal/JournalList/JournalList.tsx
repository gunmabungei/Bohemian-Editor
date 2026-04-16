import { Button, Stack } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type Journal = {
	id: number
	title: string
	url_name: string
}

export default function JournalList(props: { onSelect?: () => void }) {
	const [journalList, setJournalList] = useState<Journal[]>([])
	const navigate = useNavigate()
	const handleNavigate = (to: string) => {
		props.onSelect?.()
		navigate(`/edit/${to}/works`)
	}

	useEffect(() => {
		fetch(`${API_BASE_URL}/journal/list`)
			.then(response => response.json())
			.then(data => setJournalList(data))
			.catch(error => console.error('Fetching data failed', error))
	}, [])

	const toButton = (x: Journal) => (
		<Button
			key={x.id}
			variant='outline'
			color='gray'
			onClick={() => handleNavigate(x.url_name)}
		>
			{x.title}
		</Button>
	)

	return <Stack>{journalList.map(toButton)}</Stack>
}

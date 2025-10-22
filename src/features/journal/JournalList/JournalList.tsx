import { Button, Stack } from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Journal = {
	id: number
	title: string
	url_name: string
}

const emptyList: Journal[] = []

export default function JournalList() {
	const [journalList, setJournalList] = useState(emptyList)
	const navigate = useNavigate()
	const handleNavigate = (to: string) => {
		navigate(`/edit/${to}/works`)
	}
	fetch('http://localhost:3000/journal/list')
		.then(response => response.json())
		.then(data => setJournalList(data))
		.catch(error => console.error('Fetching data failed', error))

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

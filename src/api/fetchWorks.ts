import type { Works } from '.././types/Works.ts'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const fetchWorks = async (id: number, journalName: string): Promise<Works> => {
	const res = await fetch(
		`${API_BASE_URL}/journal/${journalName}/works/${id}`
	)
	if (!res.ok) throw new ReferenceError('Works not found')
	const data = await res.json()
	return {
		id,
		body: data.body ?? '',
		title: data.title ?? '',
		author: data.author ?? '',
		postscript: data.postscript ?? '',
	}
}

async function fetchAllWorks(journal_name: string): Promise<Works[]> {
	const res = await fetch(
		`${API_BASE_URL}/journal/works_list/${journal_name}`
	)
	if (!res.ok) return []
	const data = await res.json()
	if (!Array.isArray(data) || !data.length) return []
	return data
		.sort((a: { index: number }, b: { index: number }) =>
			a.index > b.index ? 1 : -1
		)
		.map(
			(w: {
				id: number
				title?: string
				author?: string
				body?: string
				postscript?: string
			}) => ({
				id: w.id,
				body: w.body ?? '',
				title: w.title ?? '',
				author: w.author ?? '',
				postscript: w.postscript ?? '',
			})
		)
}

export { fetchWorks, fetchAllWorks }

import type { WorksForm } from '@/features/works/AddWorks'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function uploadWorks(
	works: WorksForm[],
	journal: string
): Promise<void> {
	for (const w of works) {
		await fetch(`${API_BASE_URL}/journal/${journal}/upload_works`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: w.title,
				author: w.author,
				body: w.body,
				postscript: w.postscript,
			}),
		})
	}
}

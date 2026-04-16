import type { Works } from '@/types/Works.ts'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function updateWorks(
	data: Works,
	ctx: { journal: string; index: number }
): Promise<void> {
	await fetch(
		`${API_BASE_URL}/journal/${ctx.journal}/works/${data.id}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: data.title,
				author: data.author,
				body: data.body,
				postscript: data.postscript,
			}),
		}
	)
}

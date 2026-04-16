const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function createJournal(data: {
	title: string
	url_name: string
	category?: number
}): Promise<void> {
	await fetch(`${API_BASE_URL}/journal/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
}

export async function updateJournal(
	journalName: string,
	data: Record<string, unknown>
): Promise<void> {
	await fetch(`${API_BASE_URL}/journal/${journalName}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
}

export async function reorderWorks(
	journalName: string,
	order: number[]
): Promise<void> {
	await fetch(`${API_BASE_URL}/journal/${journalName}/works/reorder`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ order }),
	})
}

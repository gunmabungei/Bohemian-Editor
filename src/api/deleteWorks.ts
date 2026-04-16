const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function deleteWorks(
	journalName: string,
	worksId: number
): Promise<void> {
	await fetch(
		`${API_BASE_URL}/journal/${journalName}/works/${worksId}`,
		{ method: 'DELETE' }
	)
}

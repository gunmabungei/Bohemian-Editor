import { updateJournal } from '@/api'
import type { Journal } from '@/types/Journal.ts'

export async function saveChanges(
	journalName: string,
	journal: Journal
): Promise<void> {
	await updateJournal(journalName, {
		title: journal.title,
		cover_url: journal.cover_url,
		backcover_url: journal.backcover_url,
	})
}

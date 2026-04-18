import { updateJournal } from '@/api'
import type { Journal } from '@/types/Journal.ts'

export async function saveChanges(
	journalId: string,
	journal: Journal
): Promise<void> {
	const data: Record<string, unknown> = {
		title: journal.title,
		cover_url: journal.cover_url,
		backcover_url: journal.backcover_url,
		category: journal.type === 'onepiecepuzzle' ? 1 : 0,
		publish_year: journal.publish_date.getFullYear(),
		publish_month: journal.publish_date.getMonth() + 1,
		publish_day: journal.publish_date.getDate(),
	}

	await updateJournal(journalId, data)
}

import { updateJournal } from '@/api'
import type { Journal } from '@/types/Journal.ts'

export async function saveChanges(
	journalName: string,
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
		publisher_name: journal.publisher?.name ?? '',
		publisher_grade: journal.publisher?.grade ?? 1,
		publisher_department: journal.publisher?.department ?? 'M',
	}

	if (journal.type === 'bohemian') {
		data.season = journal.season
	} else {
		data.volume = journal.volume
		data.tt_selection = journal.TTSelection
	}

	await updateJournal(journalName, data)
}

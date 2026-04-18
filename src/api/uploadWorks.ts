import { Supabase } from './Supabase.ts'
import type { WorksForm } from '@/features/works/AddWorks'

export async function uploadWorks(
	works: WorksForm[],
	journalId: string
): Promise<void> {
	const { data } = await Supabase.from('works')
		.select('id, index')
		.eq('journal_id', journalId)
	const maxId = (data ?? []).reduce((max, w) => Math.max(max, w.id), 0)
	const baseIndex = (data ?? []).length + 1
	const insertData = works.map((w, i) => ({
		id: maxId + 1 + i,
		index: baseIndex + i,
		journal_id: journalId,
		title: w.title,
		author: w.author,
		body: w.body,
		postscript: w.postscript,
	}))
	const { error } = await Supabase.from('works').insert(insertData)
	if (error) throw error
}

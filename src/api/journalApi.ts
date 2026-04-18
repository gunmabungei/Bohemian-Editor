import { Supabase } from './Supabase.ts'
import type { Database } from './database.types.ts'

type JournalRow = Database['public']['Tables']['journal']['Row']

export async function fetchJournalList(): Promise<JournalRow[]> {
	const { data, error } = await Supabase.from('journal').select('*')
	if (error) throw error
	return data ?? []
}

export async function fetchJournalById(id: string): Promise<JournalRow | null> {
	const { data, error } = await Supabase.from('journal')
		.select('*')
		.eq('id', id)
		.single()
	if (error) return null
	return data
}

export async function createJournal(data: {
	title: string
	id: string
	category: number
}): Promise<void> {
	const { error } = await Supabase.from('journal').insert({
		id: data.id,
		title: data.title,
		category: data.category,
	})
	if (error) throw error
}

export async function updateJournal(
	journalId: string,
	data: Record<string, unknown>
): Promise<void> {
	const { error } = await Supabase.from('journal')
		.update(data)
		.eq('id', journalId)
	if (error) throw error
}

export async function reorderWorks(
	journalId: string,
	order: number[]
): Promise<void> {
	for (let i = 0; i < order.length; i++) {
		const { error } = await Supabase.from('works')
			.update({ index: i + 1 })
			.eq('id', order[i])
		if (error) throw error
	}
}

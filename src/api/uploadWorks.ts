import { Supabase } from './Supabase.ts'
import type { Database } from './database.types.ts'
import type { WorksForm } from '@/features/works/AddWorks'

type WorksEntity = Database['public']['Tables']['works']['Row']

const tempNumber = -1

const toEntity = (data: WorksForm, journal: string): WorksEntity => {
	return {
		...data,
		id: tempNumber, // must be overridden
		index: tempNumber,
		journal: journal,
	}
}

export async function uploadWorks(
	works: WorksForm[],
	journal: string
): Promise<void> {
	const { data } = await Supabase.from('works')
		.select('id')
		.eq('journal', journal)
	const maxId = (data ?? []).reduce((max, w) => Math.max(max, w.id), 0)
	const baseIndex = (data ?? []).length + 1
	const insertData = works
		.map(data => toEntity(data, journal))
		.map((w, i) => ({ ...w, id: maxId + 1 + i, index: baseIndex + i }))
	await Supabase.from('works').insert(insertData)
}

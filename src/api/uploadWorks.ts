import { Client } from './Client.ts'
import type { Database } from './database.types.ts'
import type { WorksForm } from '@/components/features/works/AddWorks'

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
	const { data } = await Client.from('works')
		.select('id')
		.eq('journal', journal)
	const baseId = (data ?? []).length + 1
	const insertData = works
		.map(data => toEntity(data, journal))
		.map((w, i) => ({ ...w, id: baseId + i, index: baseId + i }))
	await Client.from('works').insert(insertData)
}

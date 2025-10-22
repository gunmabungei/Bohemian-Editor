import { Supabase } from './Supabase.ts'
import type { Works } from '.././types/Works.ts'
import type { Database } from './database.types.ts'

type WorksEntity = Database['public']['Tables']['works']['Row']

function toWorks(ent: WorksEntity): Works {
	return {
		...ent,
		body: ent.body ?? '',
		title: ent.title ?? '',
		author: ent.title ?? '',
		postscript: ent.postscript ?? '',
	}
}

const fetchWorks = async (id: number): Promise<Works> => {
	const { data, error } = await Supabase.from('works')
		.select('*')
		.eq('id', id)
	if (error) throw error
	else if (!data || !data.length) throw ReferenceError
	return toWorks(data[0])
}

function sortEntity(ent: WorksEntity[]): WorksEntity[] {
	return ent.sort((a, b) => (a.index > b.index ? 1 : -1))
}

async function fetchAllWorks(journal_name: string): Promise<Works[]> {
	const { data, error } = await Supabase.from('works')
		.select('*')
		.eq('journal', journal_name)
	if (error) throw error
	else if (!data || !data.length) return []
	return sortEntity(data).map(toWorks)
}

export { fetchWorks, fetchAllWorks }

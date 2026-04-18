import { Supabase } from './Supabase.ts'

export async function deleteWorks(
	_journalId: string,
	worksId: number
): Promise<void> {
	const { error } = await Supabase.from('works')
		.delete()
		.eq('id', worksId)
	if (error) throw error
}

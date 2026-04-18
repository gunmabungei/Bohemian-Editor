import { Supabase } from './Supabase.ts'
import type { Works } from '@/types/Works.ts'

export async function updateWorks(
	data: Works,
	ctx: { journal: string; index: number }
): Promise<void> {
	const { error } = await Supabase.from('works')
		.update({
			title: data.title,
			author: data.author,
			body: data.body,
			postscript: data.postscript,
			journal_id: ctx.journal,
			index: ctx.index,
		})
		.eq('id', data.id)
	if (error) throw error
}

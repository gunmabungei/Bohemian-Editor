import { Client } from './Client.ts'
import type { Works } from '.././types/Works.ts'
import type { Database } from './database.types.ts'

type WorksEntity = Database['public']['Tables']['works']['Row']

async function updateWorks(
	data: Works,
	ctx: { journal: string; index: number }
): Promise<void> {
	const toEntity = (d: Works): WorksEntity => {
		return {
			...d,
			journal: ctx.journal,
			index: ctx.index,
		}
	}
	const { error } = await Client.from('works')
		.update(toEntity(data))
		.eq('id', data.id)
	if (error) throw error
}

export { updateWorks }

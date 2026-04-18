import { Supabase } from './Supabase.ts'

export async function signInWithDiscord(): Promise<void> {
	const { error } = await Supabase.auth.signInWithOAuth({
		provider: 'discord',
		options: {
			redirectTo: `${window.location.origin}/auth/callback`,
		},
	})
	if (error) throw error
}

export async function signOut(): Promise<void> {
	const { error } = await Supabase.auth.signOut()
	if (error) throw error
}

export async function isAllowedUser(discordUserId: string): Promise<boolean> {
	const { data } = await Supabase.from('allowed_users')
		.select('discord_user_id')
		.eq('discord_user_id', discordUserId)
		.maybeSingle()
	return !!data
}

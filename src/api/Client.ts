import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types.ts'

const secret: string = import.meta.env.VITE_DB_KEY
const url: string = import.meta.env.VITE_DB_URL
export const Client = createClient<Database>(url, secret)

import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

export const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "http://127.0.0.1:54321",
    process.env.NEXT_PUBLIC_ANON_SUPABASE_KEY
)
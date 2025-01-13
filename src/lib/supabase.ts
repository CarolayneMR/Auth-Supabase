import { createClient } from '@supabase/auth-helpers-sveltekit';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$lib/static/public';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

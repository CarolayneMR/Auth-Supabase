import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { set } from 'zod';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const supabase = event.locals.supabase;
		const { email, password } = form.data;
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.log(error);
			return setError(form, 'password', 'Conta já existe!');
		} else {
			return redirect(303, '/');
		}
	}
};

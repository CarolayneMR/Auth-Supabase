import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { set } from 'zod';

/** Exporta a função load que carrega dados para a página, preparando o formulário para ser utilizado na interface do usário.
 * Utiliza o superValidate para validar os dados com base no formSchema e prepara o estado inicial do formulário. 
 * Retorna um objeto com o formulário validado para ser usado no componente.
 */
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

/** Define um conjunto de ações, com uma ação padrão (default).
Valida os dados enviados do formulário.
Retorna um erro 400 caso os dados sejam inválidos.
Valida os dados do evento (event) com o formSchema.
Se a validação falhar (!form.valid), retorna um erro HTTP 400 junto com os dados do formulário.
*/
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		/**Obtém o cliente supabase da requisição.
           extrai os campos email e password dos dados do formulário.
		    Desestrutura os dados do formulário para usá-los no registro.*/
		const supabase = event.locals.supabase;
		const { email, password } = form.data;

        /**Usa o método signUp do supabase para registrar um novo usuário.
           Retorna um objeto com a propriedade error, caso algo dê errado. */
		const { error } = await supabase.auth.signUp({ email, password });
		
		/** Verifica se houve erro no registro.
            Define uma mensagem de erro personalizada no formulário, caso a conta já exista.
            Redireciona o usuário para a página inicial (/) em caso de sucesso.*/
		if (error) {
			console.log(error);
			return setError(form, 'password', 'Conta já existe!');
		} else {
			return redirect(303, '/');
		}
	}
};
 /** Aqui se validar o lado do clinete e no lado do servidor  
  * O código gerencia um formulário de registro de usuário. Ele usa o SvelteKit com o sveltekit-superforms para validar os dados e o supabase para autenticar e registrar os usuários.
 */
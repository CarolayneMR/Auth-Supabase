// Importações dos tipos e funções necessárias do SvelteKit e outras bibliotecas
import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit'; // Funções de falha e redirecionamento
import type { PageServerLoad } from '@sveltejs/kit'; // Tipo para a função load
import { setError, superValidate } from 'sveltekit-superforms'; // Funções para validar e manipular formulários
import { formSchema } from './schema'; // Esquema de validação do formulário
import { zod } from 'sveltekit-superforms/adapters'; // Adaptador para Zod, uma biblioteca de validação de esquema
import { set } from 'zod'; // Função do Zod, mas não está sendo utilizada corretamente no código

// Função load, responsável por carregar dados para a página (usado para o formulário)
export const load: PageServerLoad = async () => {
	// Retorna o formulário validado, usando o esquema Zod para validação
	return {
		form: await superValidate(zod(formSchema)) // Usa o adaptador Zod com o esquema para validação
	};
};

// Ações associadas a um formulário (o método 'default' é utilizado como ação padrão)
export const actions: Actions = {
	default: async (event) => {
		// Valida o formulário enviado com os dados do evento e o esquema Zod
		const form = await superValidate(event, zod(formSchema));
		// Se o formulário não for válido, retorna um erro 400 e o formulário com os erros
		if (!form.valid) {
			return fail(400, {
				form // Retorna o formulário com erros
			});
		}

		// Recupera a instância do Supabase a partir dos dados do evento
		const supabase = event.locals.supabase;
		// Desestruturação para pegar o email e a senha do formulário
		const { email, password } = form.data;
		// Tenta fazer login com email e senha usando o Supabase
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		// Se ocorrer um erro no login, define um erro no campo de senha e mostra mensagem personalizada
		if (error) {
			console.log(error); // Exibe o erro no console para depuração
			// Define um erro para o campo 'password' indicando que as credenciais são inválidas
			return setError(form, 'password', 'Email ou senha incorretos');
		} else {
			// Se o login for bem-sucedido, redireciona o usuário para a página inicial
			return redirect(303, '/');
		}
	}
};

<script>
	// Importação do arquivo CSS específico para estilizar a aplicação.
	import '../app.css';

	// Importação de funções do kit Svelte para navegação e gerenciamento de dados.
	import { goto } from '$app/navigation';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte'; // Função que executa código quando o componente é montado.

	// Inicialização de variáveis que recebem os dados e filhos passados como propriedades para o componente.
	let { data, children } = $props();

	// Inicialização de variáveis derivadas que recebem o estado da sessão e a instância do Supabase a partir dos dados.
	let { session, supabase } = $derived(data);

	// O bloco "onMount" executa o código dentro dele assim que o componente é renderizado pela primeira vez.
	onMount(() => {
		// Escuta mudanças no estado de autenticação do Supabase.
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			// Caso a nova sessão seja nula, significa que o usuário saiu ou foi desconectado.
			if (!newSession) {
				// Aqui, o código para invalidar o estado da autenticação está comentado, mas poderia ser usado para atualizar o estado da aplicação.
				//invalidate('supabase:auth');
			}

			// Verifica se a nova sessão possui uma data de expiração diferente da sessão atual.
			// Caso seja diferente, invalida o cache de autenticação para garantir que os dados sejam atualizados.
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		// Retorna uma função de limpeza que será executada ao desmontar o componente.
		// Cancela a assinatura da escuta de mudanças no estado de autenticação.
		return () => data.subscription.unsubscribe();
	});
</script>

<!-- Renderiza os filhos passados como conteúdo do componente. -->
{@render children()}

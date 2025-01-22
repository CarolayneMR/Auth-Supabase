<script lang="ts">
	// Importa a função 'goto' do módulo '$app/navigation', que permite navegar entre páginas.
	import { goto } from '$app/navigation';

	// Importa o componente 'Button' de um caminho definido pela aplicação.
	import { Button } from '$lib/components/ui/button';

	// Declara uma propriedade de entrada chamada 'data', que será passada ao componente.
	export let data;

	// Usa a diretiva reativa `$:` para atualizar variáveis reativas automaticamente
	// sempre que o valor de `data` mudar. Desestrutura `supabase` e `user` do objeto `data`.
	$: ({ supabase, user } = data);

	// Define uma função assíncrona chamada `logout`, usada para desconectar o usuário.
	async function logout() {
		// Realiza o logout do usuário chamando o método `signOut` do Supabase.
		await supabase.auth.signOut();

		// Redireciona o usuário para a página inicial após o logout
		// e invalida todo o cache do lado do cliente.
		goto("/", { invalidateAll: true });
	}
</script>

<!-- Estrutura HTML com classes do Tailwind CSS para estilização -->
<div class="flex flex-col items-center justify-center bg-gray-900 pt-24 text-gray-200 text-center h-screen mx-auto px-4">
	<!-- Título da página -->
	<h1 class="text-4xl mb-4 font-bold">SUPEEEERRR</h1>

	<!-- Descrição da página -->
	<p class="text-lg mb-6 font-bold">Feito com intuito de estudar sobre Auth com o SupaBase</p>

	<!-- Verifica se há um usuário autenticado usando blocos condicionais do Svelte -->
	{#if user}
		<!-- Exibe uma mensagem de boas-vindas com o e-mail do usuário autenticado -->
		<p class="text-xl mb-4 font-bold">Bem-vindo de volta, { user.email }!</p>

		<!-- Botão para fazer logout, que chama a função `logout` ao ser clicado -->
		<Button class="btn btn-primary" on:click={ logout }>Logout</Button>
	{:else}
		<!-- Caso não haja um usuário autenticado, exibe links para login e registro -->
		<div class="flex justify-center gap-4">
			<!-- Link para a página de login -->
			<a class="text-purple-400 hover:text-purple-600 transition-colors text-base" href="/login">Logar</a>
			<!-- Separador visual entre os links -->
			<span class="text-gray-600 text-base">|</span>
			<!-- Link para a página de registro -->
			<a class="text-purple-400 hover:text-purple-600 transition-colors text-base" href="/register">Criar Conta</a>
		</div>
	{/if}
</div>

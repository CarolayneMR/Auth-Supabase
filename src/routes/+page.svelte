<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	export let data;

	$: ({ supabase, user } = data);

	async function logout() {
        await supabase.auth.signOut();
        goto("/" , { invalidateAll: true});
    }
</script>

<div class="flex flex-col items-center justify-center bg-gray-900 pt-24 text-gray-200 stext-center h-screen mx-auto px-4">
    <h1 class="text-4xl mb-4 font-bold">SUPEEEERRR</h1>
    <p class="text-lg mb-6 font-bold">Feito com intuito de estudar sobre Auth com o SupaBase</p>
    {#if user}
        <p class="text-xl mb-4 font-bold">Bem-vindo de volta, { user.email }!</p>
        <Button class="btn btn-primary" on:click={ logout }>Logout</Button>
    {:else}
        <div class="flex justify-center gap-4">
            <a class="text-purple-400  hover:text-purple-600 transition-colors text-base" href="/login">Logar</a>
            <span class="text-gray-600 text-base">|</span>
            <a class="text-purple-400 hover:text-purple-600 transition-colors text-base" href="/register">Criar Conta</a>
        </div>
    {/if}
</div>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	export let data;

	$: ({ supabase, user } = data);

	async function logout() {
        await supabase.auth.signOut();
        goto("/" , { invalidateAll: true });
    }
</script>

<div class="container">
    <h1 class="title">SITE</h1>
    <p class="description">Essa aplicação é um exemplo de como usar o SvelteKit com o Supabase.</p>
    {#if user}
        <p class="welcome-message">Bem-vindo de volta, { user.email }!</p>
        <Button class="logout-button" on:click={ logout }>Logout</Button>
    {:else}
        <div class="auth-links">
            <a class="login-link" href="/login">Logar</a>
            <span class="separator">|</span>
            <a class="register-link" href="/register">Criar Conta</a>
        </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 100vh;
        margin: 0 auto;
        padding: 0 1rem;
        background-color: #f5f5f5;
    }

    .title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #333;
    }

    .description {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
        color: #666;
    }

    .welcome-message {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #333;
    }

    .auth-links {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    .login-link, .register-link {
        color: #007bff;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s ease;
    }

    .login-link:hover, .register-link:hover {
        color: #0056b3;
    }

    .separator {
        color: #666;
        font-size: 1rem;
    }
</style>
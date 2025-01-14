<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { goto } from '$app/navigation';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;

	function voltar() {
		goto('/');
	}
</script>

<div class="flex min-h-screen items-start justify-center bg-gray-900 pt-24 text-gray-200">
	<form
		method="POST"
		use:enhance
		class="w-full max-w-sm space-y-6 rounded-md bg-gray-800 p-8 shado">


		<div class="flex items-center justify-between">
			<button on:click={voltar} class="h-8 w-14 rounded-md bg-purple-600">
				<span>⇦</span>
			</button>
			<h1 class="mr-20 text-center text-2xl font-bold">Criar Conta</h1>
		</div>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label class="block text-sm font-medium">Email</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.email}
					type="email"
					class="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label class="block text-sm font-medium">Senha</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.password}
					type="password"
					class="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 focus:border-purple-500 focus:ring-purple-500"
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button
			class="w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
		>
			Criar Conta
		</Form.Button>
	</form>
</div>

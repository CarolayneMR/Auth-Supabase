<script lang="ts">
	import type { PageData } from './$types.js';
	import Register from './Register.svelte';
	export let data: PageData;
</script>

<div class="flex h-screen items-center justify-center">
	<div class="max-w-md flex-grow shadow rounded p-8">
		<h1 class="text-3xl font-bold mb-4">
			Register
		</h1>
		<Register data={data.form} />
	</div>
</div>
<script lang="ts">
	import type { PageData } from './$types.js';
	import Login from './Login.svelte';
	export let data: PageData;
</script>

<div class="min-h-screen flex flex-col justify-start bg-gray-900 text-gray-200">
	<div class="w-full max-w-lg mx-auto rounded-lg p-8 bg-transparent pt-44">
		<Login data={data.form} />
	</div>
</div>
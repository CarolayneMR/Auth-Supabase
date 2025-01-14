<script lang="ts">
	import type { PageData } from './$types.js';
	import Register from './Register.svelte';
	export let data: PageData;
  

  </script>
  
  <div class="min-h-screen flex flex-col justify-start bg-gray-900 text-gray-200">
	<!-- Botão Voltar colocado mais para cima -->
  <div class="w-full max-w-lg mx-auto rounded-lg p-8 bg-transparent pt-44">
	  <Register data={data.form} />
	</div>
  </div>
  
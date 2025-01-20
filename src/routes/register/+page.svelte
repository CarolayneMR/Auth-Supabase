<script lang="ts">
	import type { PageData } from './$types.js';
	import Register from './Register.svelte';
	export let data: PageData;
	/**Declara uma variável data que é exportada e cujo tipo é PageData. Isso significa que o componente espera receber esta variável como uma propriedade ao ser utilizado em outro lugar.*/
  

  </script>
  
  <div class="min-h-screen flex flex-col justify-start bg-gray-900 text-gray-200">
	<!-- Botão Voltar colocado mais para cima -->
  <div class="w-full max-w-lg mx-auto rounded-lg p-8 bg-transparent pt-44">
	  <Register data={data.form} />
	  <!--Usa o componente Register importado.
Passa uma propriedade chamada data, cujo valor é data.form. Isso significa que Register receberá os dados específicos de form presentes em data.-->
	</div>
  </div>

  <!--Essa parte da o designer do lado de forna do formulário !-->
  
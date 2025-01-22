// Importa funções da biblioteca '@supabase/ssr' para criar clientes e verificar o ambiente.
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'

// Importa variáveis de ambiente públicas contendo a URL do Supabase e a chave de acesso anônima.
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

// Define o tipo da função `load` usado no layout.
import type { LayoutLoad } from './$types'

// Exporta a função `load` para carregar dados no layout.
export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  /**
   * Declara uma dependência chamada 'supabase:auth' para que o layout seja
   * invalidado (recarregado) automaticamente, por exemplo, durante a atualização de uma sessão.
   */
  depends('supabase:auth')

  /**
   * Configura o cliente Supabase dependendo se o código está no navegador ou no servidor:
   * - No navegador: usa `createBrowserClient`.
   * - No servidor: usa `createServerClient` com suporte a cookies.
   */
  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch, // Usa a função de busca fornecida como parâmetro.
        },
      })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch, // Define a função de busca globalmente.
        },
        cookies: {
          getAll() {
            // Recupera todos os cookies do lado do servidor a partir dos dados fornecidos.
            return data.cookies
          },
        },
      })

  /**
   * Recupera a sessão atual do usuário. 
   * No cliente, é seguro porque usa métodos de acesso direto.
   * No servidor, usa dados validados previamente a partir de `LayoutData`.
   */
  const {
    data: { session },
  } = await supabase.auth.getSession()

  /**
   * Recupera os dados do usuário autenticado.
   * Isso permite acessar informações como ID do usuário e outras propriedades de perfil.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser()

  /**
   * Retorna a sessão, o cliente Supabase e os dados do usuário para serem
   * utilizados no layout da aplicação.
   */
  return { session, supabase, user }
}

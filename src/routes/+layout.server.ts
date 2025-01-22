// Importa o tipo `LayoutServerLoad` de um arquivo local chamado `$types`. 
// Esse tipo ajuda a definir a forma esperada da função de carregamento (load).
import type { LayoutServerLoad } from './$types'

// Exporta a função `load`, que será usada para carregar dados no lado do servidor.
// `LayoutServerLoad` é o tipo definido para garantir que a função segue o formato correto.
export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {

  // Chama a função `safeGetSession` de dentro de `locals` para obter a sessão de forma segura.
  // Essa função é provavelmente uma utilidade fornecida para recuperar dados de sessão do usuário.
  const { session } = await safeGetSession()

  // Retorna um objeto contendo:
  // - A sessão do usuário, que pode ser usada no lado do cliente ou servidor.
  // - Todos os cookies disponíveis, recuperados usando `cookies.getAll()`.
  return {
    session, // Sessão atual do usuário.
    cookies: cookies.getAll(), // Lista de todos os cookies disponíveis.
  }
}

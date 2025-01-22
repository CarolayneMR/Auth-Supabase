import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

const supabase: Handle = async ({ event, resolve }) => {
  /**
   * Cria um cliente do Supabase específico para esta requisição no servidor.
   *
   * O cliente do Supabase obtém o token de autenticação a partir dos cookies da requisição.
   */
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * A API de cookies do SvelteKit exige que `path` seja explicitamente definido
       * nas opções de cookies. Definir `path` como `/` replica o comportamento
       * padrão/anterior.
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  /**
   * Diferente de `supabase.auth.getSession()`, que retorna a sessão _sem_
   * validar o JWT, esta função também chama `getUser()` para validar o
   * JWT antes de retornar a sessão.
   */
  event.locals.safeGetSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()
    if (error) {
      // A validação do JWT falhou
      return { session: null, user: null }
    }

    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      /**
       * As bibliotecas do Supabase usam os cabeçalhos `content-range` e
       * `x-supabase-api-version`, então precisamos informar ao SvelteKit para
       * passá-los adiante.
       */
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession()
  event.locals.session = session
  event.locals.user = user

  // Se não houver uma sessão ativa e o caminho começar com `/private`,
  // o usuário será redirecionado para a página de autenticação.
  if (!event.locals.session && event.url.pathname.startsWith('/private')) {
    redirect(303, '/auth')
  }

  // Se houver uma sessão ativa e o caminho for `/auth`,
  // o usuário será redirecionado para a página privada.
  if (event.locals.session && event.url.pathname === '/auth') {
    redirect(303, '/private')
  }

  return resolve(event)
}

// Combina os middlewares `supabase` e `authGuard` em sequência.
export const handle: Handle = sequence(supabase, authGuard)

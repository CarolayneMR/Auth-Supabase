import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
// Importa os tipos `Session`, `SupabaseClient` e `User` da biblioteca `@supabase/supabase-js`,
// que representam respectivamente a sessão do usuário, o cliente do Supabase e as informações do usuário.

declare global {
// Declara um escopo global para adicionar ou estender tipos da aplicação.

  namespace App {
  // Cria um namespace `App` que contém definições específicas para a aplicação.

    // interface Error {}
    // Comentado: pode ser usada para definir um tipo de erro personalizado, caso necessário.

    interface Locals {
      supabase: SupabaseClient
      // Propriedade que contém a instância do cliente do Supabase, usada para interagir com a API e o banco de dados.

      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
      // Método que retorna uma Promise com um objeto contendo a sessão do usuário e o usuário autenticado,
      // ou `null` se não houver dados disponíveis.

      session: Session | null
      // Propriedade que representa a sessão atual, ou `null` se não houver uma sessão ativa.

      user: User | null
      // Propriedade que representa o usuário autenticado atual, ou `null` se não houver usuário.
    }

    interface PageData {
      session: Session | null
      // Propriedade que representa a sessão ativa disponível na página atual,
      // ou `null` se não houver sessão.
    }

    // interface PageState {}
    // Comentado: pode ser usada para definir o estado da página, se necessário.

    // interface Platform {}
    // Comentado: pode ser usada para definir informações específicas da plataforma, como cliente ou servidor.
  }
}

export {}
// Exporta um módulo vazio para garantir que o arquivo seja tratado como um módulo TypeScript,
// permitindo o uso de declarações globais sem conflitos.

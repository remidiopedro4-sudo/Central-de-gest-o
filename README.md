# CENTRAL DE GESTÃO

Painel de gestão da operação integrada de mídia/audiência e produto/comercial.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS v4
- shadcn/ui (configuração inicial)
- Neon PostgreSQL + Drizzle ORM
- Better Auth (dependência incluída; configuração de sessão e provisionamento será concluída na etapa de autenticação)
- Vercel

## Desenvolvimento local
1. Requer Node.js 20.9 ou superior.
2. Execute `npm install`.
3. Copie `.env.example` para `.env.local` e preencha a conexão Neon.
4. Gere e aplique as migrações:
   `npm run db:generate` e `npm run db:migrate`.
5. Inicie com `npm run dev`.

## Segurança
- Nunca versione `.env.local` ou credenciais.
- Use conexão SSL/pooling do Neon na Vercel.
- Não habilite cadastro público sem implementar autorização e provisionamento controlado do administrador.
- O dashboard inicial utiliza estados vazios: os zeros não são dados de vendas ou audiência reais.

## Próximas entregas
1. Autenticação e proteção de rotas.
2. CRUD de metas, tarefas e POPs.
3. Calendário editorial e indicadores do Instagram.
4. CRM, pipeline e registro de vendas.
5. Financeiro, relatórios e auditoria.
6. Integração Kiwify por webhook após validação dos eventos e credenciais.

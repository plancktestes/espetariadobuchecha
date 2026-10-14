# Visão geral
Projeto React 19 + TanStack Start/Router com shadcn/ui, Tailwind v4 e Supabase.

# Stack e convenções
- **Framework**: React 19 + TanStack Start (file-based routing em `src/routes/`)
- **UI**: shadcn/ui components em `src/components/ui/`
- **Styling**: Tailwind v4 (`src/styles.css`)
- **Database**: Supabase via `src/integrations/supabase/client` (não editar essa pasta)
- **Lint/Format**: ESLint + Prettier
- **Test**: Vitest

# Mapa de arquivos
- `src/routes/__root.tsx` → Layout raiz
- `src/routes/index.tsx` → Página inicial
- `src/router.tsx` → Configuração do router
- `src/components/ui/*` → Componentes shadcn/ui
- `src/lib/utils.ts` → Utilitários (cn, etc.)
- `src/integrations/supabase/` → Cliente Supabase (não editar)

# Decisões do usuário
- Nenhuma decisão registrada ainda.

# Pendências
- [ ] Aguardando primeiro pedido de tarefa

# Banco de dados
- Supabase configurado via integração existente. Nenhuma migração customizada ainda.
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
- `src/routes/index.tsx` → Página inicial (landingpage)
- `src/router.tsx` → Configuração do router
- `src/components/ui/*` → Componentes shadcn/ui
- `src/lib/utils.ts` → Utilitários (cn, etc.)
- `src/integrations/supabase/` → Cliente Supabase (não editar)

# Decisões do usuário
- [x] Landingpage criada com hero section, features e call-to-action
- Estrutura de hero com título principal, subtítulo e botões de chamada
- Seção de features com 3 cards (Design Intuitivo, Integração Fácil, Suporte dedicado)
- Seção final de call-to-action com botão de chamada principal

# Pendências
- [ ] Landingpage criada com sucesso
- [ ] Verificar responsividade em dispositivos móveis
- [ ] Testar em diferentes navegadores

# Banco de dados
- Supabase configurado via integração existente. Nenhuma migração customizada ainda.
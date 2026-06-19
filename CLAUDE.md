@AGENTS.md

# Furikake — Guia do Projeto

Livro de receitas digital pessoal. App mobile-first (max-width 480px), construído com Next.js App Router e Tailwind CSS v4.

## Stack

- **Next.js** (App Router, versão com breaking changes — ler `node_modules/next/dist/docs/` antes de escrever código)
- **Tailwind CSS v4** — escala de spacing ilimitada, `h-30`/`h-51` etc. são classes válidas
- **Base UI** — primitivos de componente (`@base-ui/react/*`)
- **Zustand** — estado global com `persist` middleware
- **gray-matter** — parse de frontmatter MDX para as receitas
- **Lucide React** — ícones

## Estrutura de pastas

```
src/
  app/              # Rotas Next.js — apenas templates de página
  components/
    favorites/      # Componentes da tela de favoritos
    layout/         # NavBar, PageHeader
    recipe/         # Todos os componentes de receita
    search/         # Componentes da tela de busca
    ui/             # Primitivos genéricos (Badge, Button, Checkbox)
  consts/           # Constantes estáticas (ex: tagConfig.ts)
  hooks/            # Custom hooks React
  lib/              # Funções utilitárias de dados (acesso ao filesystem)
  store/            # Stores Zustand
  types/            # Interfaces e tipos TypeScript
content/
  recipes/          # Arquivos MDX das receitas, organizados por categoria
```

## Convenções

### Pages são templates

Arquivos `page.tsx` devem ser apenas composição de componentes — sem JSX inline complexo e sem lógica de transformação de dados. Se houver um bloco de markup ou lógica inline, extrair para um componente em `/components`.

```tsx
// Correto — page como template puro
export default function RecipePage({ params }) {
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (
    <div>
      <RecipeHero ... />
      <RecipeTitle ... />
      <RecipeAbout ... />
    </div>
  );
}

// Errado — markup e lógica inline na page
export default function RecipePage() {
  return (
    <div>
      <div className="relative w-full h-80">
        <Image ... />
        <Link href="/" ...><ArrowLeft /></Link>
        ...
      </div>
    </div>
  );
}
```

### Fluxo de controle — prefira o caminho feliz

Evite `if/else`. Use early return para casos de guarda e deixe o caminho principal fluir sem aninhamento.

```ts
// Correto
if (isFavorite(slug)) return removeFavorite(slug);
addFavorite(slug);

// Evitar
if (isFavorite(slug)) {
  removeFavorite(slug);
} else {
  addFavorite(slug);
}
```

O mesmo vale para guard clauses em componentes:

```tsx
// Correto
if (recipes.length === 0) return null;
return <section>...</section>;

// Evitar
if (recipes.length > 0) {
  return <section>...</section>;
} else {
  return null;
}
```

### Tailwind — sem valores arbitrários

Preferir utilitários Tailwind a valores entre colchetes. Tailwind v4 suporta escala ilimitada: `h-30`, `h-51`, `h-55`, `w-33.5` são válidos.

```tsx
// Correto
<div className="h-9 w-9 rounded-full" />

// Evitar — h-9 existe, rounded-full existe; não use colchetes quando há utilitário
// <div className="h-{9} w-{9} rounded-{full}" />
```

Exceções aceitáveis quando não existe utilitário equivalente no tema atual:
- `rounded-[20px]`, `rounded-[45px]` — valores de raio sem correspondência no tema
- `rounded-t-[32px]` — idem
- `shadow-[0_4px_4px_rgba(0,0,0,0.10)]` — sombra customizada
- Seletores de pseudo-elemento/variante compostos como `[&>svg]:size-3.5`

### Componentes

- Cada componente exporta exatamente uma função nomeada (sem `export default`)
- Interface de props declarada imediatamente antes da função, no mesmo arquivo
- `"use client"` apenas quando necessário (hooks, eventos, estado)
- Sem comentários óbvios — o nome das funções e variáveis deve ser autoexplicativo

### Nomenclatura de arquivos

| Local | Convenção |
|---|---|
| `app/*/page.tsx` | sempre `page.tsx` (Next.js) |
| `components/**` | PascalCase: `RecipeHero.tsx` |
| `hooks/` | camelCase com prefixo `use`: `useShare.ts` |
| `store/` | camelCase: `favorites.ts` |
| `consts/` | camelCase: `tagConfig.ts` |
| `types/` | camelCase: `recipe.ts` |

## Camadas de dados

### `lib/recipes.ts`

Funções server-side que lêem os arquivos MDX em `content/recipes/`. Nunca importar em componentes `"use client"` — passar os dados como props.

Funções disponíveis: `getAllRecipes()`, `getRecipeBySlug(slug)`, `getFeaturedRecipe()`, `getCategories()`.

### `types/recipe.ts`

Tipos centrais: `Recipe` e `Category`. Todo dado de receita deve ser tipado por aqui.

### `store/favorites.ts`

Store Zustand com `persist` (chave `"furikake-favorites"` no localStorage). Expõe: `favoriteRecipeSlugs`, `addFavorite`, `removeFavorite`, `isFavorite`, `toggleFavorite`.

### `consts/`

Constantes estáticas que não são dados de runtime. Exemplo: `tagConfig.ts` mapeia slugs de tags para ícone, label e descrição.

#### Regra: toda tag nova deve ter entrada em `tagConfig.ts`

Sempre que uma tag inédita for adicionada ao frontmatter de uma receita MDX, ela **obrigatoriamente** deve ganhar uma entrada em `src/consts/tagConfig.ts` com `icon`, `label` e `description`. Tags sem entrada aparecem com ícone genérico na UI — o que é aceitável como fallback, mas nunca como estado final.

```ts
// src/consts/tagConfig.ts
"minha-tag": {
  icon: IconeDeLucide,   // importar o ícone correspondente
  label: "Label legível",
  description: "Uma frase descrevendo o que essa tag representa.",
},
```

Grupos existentes no arquivo (manter a organização por comentário de seção):
- **Tempo de preparo** — `rápido`, `sem-forno`, `slow-cook`
- **Método de cocção** — `forno`, `assado`
- **Dieta / Restrições** — `vegetariano`
- **Proteína / Base** — `frutos-do-mar`, `frango`, `carne`, `queijo`, `cogumelos`
- **Ingrediente destaque** — `café`, `chocolate`, `frutas`, `limão`
- **Tipo de prato** — `entrada`, `salada`, `sopa`, `risoto`, `sobremesa`
- **Ocasião** — `jantar`, `fim-de-semana`, `inverno`
- **Estilo / Vibe** — `elegante`, `requintado`, `clássico`, `reconfortante`
- **Culinária / Origem** — `italiano`, `árabe`, `peruano`, `americano`, `japonês`

### `hooks/`

Custom hooks React. Apenas lógica reutilizável com estado ou efeitos. Exemplo: `useShare` — abstrai `navigator.share` com fallback para clipboard.

## Componentes de UI (`components/ui/`)

Primitivos genéricos construídos sobre Base UI (`@base-ui/react`). Usam `cva` (class-variance-authority) para variantes. Não contêm lógica de negócio.

- `Button` — variantes: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`
- `Badge` — mesmas variantes
- `Checkbox` — usado em `IngredientList` para marcar ingredientes

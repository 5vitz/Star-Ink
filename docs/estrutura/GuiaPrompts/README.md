# 📋 Guia de Prompts do STAR INK (Esteira de Codificação GEO)

Esta camada serve como manual operacional. Ela define as 4 fases sequenciais de codificação para transformar o planejamento no e-commerce **STAR INK** (`www.star-ink.com.br`).

---

## 1. Roteiro de Codificação em 4 Fases

```
+------------------------------------------------------------+
| FASE 1: O Esqueleto PoD (Database Setup, Prisma & Seed)    |
+------------------------------------------------------------+
                              │
                              ▼
+------------------------------------------------------------+
| FASE 2: A Alma Dinâmica (Tokens, Variáveis CSS & Admin)   |
+------------------------------------------------------------+
                              │
                              ▼
+------------------------------------------------------------+
| FASE 3: O Corpo & GEO (Vitrine 9:16, JSON-LD, Componentes) |
+------------------------------------------------------------+
                              │
                              ▼
+------------------------------------------------------------+
| FASE 4: O Fluxo (APIs PoD, Feed XML, /llms.txt & Drops)   |
+------------------------------------------------------------+
```

---

## 2. Prompts de Execução

### 📝 Prompt FASE 1 (Banco de Dados PoD):
* Criar projeto Next.js App Router com TypeScript.
* Configurar Prisma ORM com schema contendo `site_settings`, `pod_suppliers`, `products`, `stock_variants`, `orders`, `order_items`.
* Executar seed populando dados iniciais e variantes de teste.

### 📝 Prompt FASE 2 (Design System & Admin):
* Criar rota `/admin/design-system` para edição em tempo real.
* Injetar variáveis CSS dinâmicas no `<head>` do layout raiz.

### 📝 Prompt FASE 3 (Vitrine & GEO):
* Criar vitrine responsiva de 3 colunas (imagens 9:16).
* Injetar JSON-LD completo (`Product`, `Organization`, `FAQPage`) via Server Components no Next.js.
* Criar Drawer da Sacola.

### 📝 Prompt FASE 4 (APIs, Drops & /llms.txt):
* Implementar rota pública `/llms.txt`.
* Implementar endpoint `/api/catalog/meta`.
* Implementar agendamento de drops via Meta Graph API e rotina de liberação do produto.

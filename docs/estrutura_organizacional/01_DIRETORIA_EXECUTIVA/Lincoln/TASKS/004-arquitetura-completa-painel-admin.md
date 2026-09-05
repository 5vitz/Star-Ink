# 📋 TASK-004: Arquitetura Completa do Painel Admin Multicanal (`/admin`)

> **Status:** Ativa 🚀  
> **Responsáveis:** Genera (Direção Criativa & UX Admin) & Lincoln (Modelagem Prisma & Integradores)  
> **Arquitetura Base:** Cockpit Executivo + 4 Módulos Especializados  
> **Última Atualização:** Agosto de 2026  

---

## 🎯 Objetivos da Tarefa

Especificar e documentar a arquitetura completa do **Painel de Controle Administrativo (`/admin`)** da STAR INK, cobrindo o Cockpit Executivo e os 4 Módulos Operacionais.

---

## 🏛️ Estrutura dos 4 Módulos & Cockpit

```
 +---------------------------------------------------------------------------------------+
 |                         PAINEL ADMIN STAR INK (`/admin`)                             |
 +---------------------------------------------------------------------------------------+
 | [∞ STAR INK]  Dashboard  1.Atendimento  2.Produção  3.Catálogo  4.Financeiro [Ctrl+K]  |
 +---------------------------------------------------------------------------------------+
                                             │
      ┌───────────────────┬──────────────────┼───────────────────┬───────────────────┐
      ▼                   ▼                  ▼                   ▼                   ▼
[ HOME / COCKPIT ]  [ MÓDULO 1: SAC ]  [ MÓDULO 2: POD ]   [ MÓDULO 3: ARTES ] [ MÓDULO 4: DRE ]
• KPIs Executivos  • Concierge 1-Click • Kanban 5 Etapas  • Schema A3 JSON    • Margem R$ 122/pç
• Alertas Ação    • IA 24h Gemini     • Multi-Supplier    • Feed Meta XML     • PIX vs Cartão
• Timeline Live   • Trocas Automáticas• Amostras Reserva  • Mídias 9:16       • Bling ERP NFe
```

---

## 📋 Detalhamento dos Módulos

### 1. Home / Cockpit Executivo (`/admin/dashboard`)
* **KPIs de Topo:** Vendas Hoje, Lucro Líquido Real, % PIX e Peças na Esteira.
* **Alertas de Ação Imediata:** Pedidos PIX pendentes e dúvidas de suporte no WhatsApp.
* **Timeline em Tempo Real:** Feed ao vivo de todas as movimentações do ecossistema.

### 2. Módulo 1 — Atendimento Concierge & IA 24/7 (`/admin/atendimento`)
* **SAC Concierge:** Tabela dinâmica de clientes com ação de 1-Clique para WhatsApp.
* **IA 24/7 (Gemini + Webhooks Contabo VPS):** Atendimento automatizado 24h com *Function Calling* seguro no PostgreSQL.
* **Logística Reversa Automática:** Geração de código de postagem nos Correios e portal de autoatendimento no site (`/trocas`).

### 3. Módulo 2 — Produção PoD, Fornecedores & Estoque (`/admin/producao`)
* **Esteira Kanban (5 Etapas):** `Aguardando` ➔ `Imprimindo DTG` ➔ `Embalagem` ➔ `Em Trânsito` ➔ `Entregue`.
* **Multi-Supplier Hub:** Tags e roteamento automático para Reserva INK, Dimona ou Estoque Físico.
* **Gestão de Amostras:** Solicitação de amostras a preço de custo no Painel do Lojista da Reserva INK.

### 4. Módulo 3 — Catálogo Canônico, Artes & Mídias (`/admin/catalogo`)
* **Cadastro Meta Spec:** Formulário canônico compatível com Instagram Shopping e Google Shopping (`JSON-LD`).
* **Central de Schemas:** Leitor e anexo de prompts JSON A3 (300x400mm, traço 1px, ex: `prompt_schema_fada.json`).
* **Media Library 9:16:** Gerenciamento drag-and-drop de fotos da vitrine, VTON e etiquetas.

### 5. Módulo 4 — Administração Financeira & Bling ERP (`/admin/financeiro`)
* **Unit Economics Real:** Cálculo de margem líquida real de **~67,7% (R$ 122,00 por camiseta)** descontando fábrica, gateway e imposto.
* **Métricas PIX:** Painel de conversão de vendas por PIX à vista (5-10% desconto).
* **Bling ERP Sync:** Emissão de NFe e sincronização fiscal via API v3 do Bling ERP (Plano Cobalto).

---

## 📋 Checklist de Execução

- [x] **Mapear Requisitos dos 4 Módulos:** [docs/TASKS/004-arquitetura-completa-painel-admin.md](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/TASKS/004-arquitetura-completa-painel-admin.md).
- [x] **Gerar Mockups 2D das Telas:** Renders da Home e Módulos 1, 2, 3 e 4.
- [ ] **Desenvolver Layout Base Next.js (Dashboard Shell & Top Navbar):** (Etapa de codificação).
- [ ] **Construir as Rotas `/admin/dashboard`, `/admin/atendimento`, `/admin/producao`, `/admin/catalogo`, `/admin/financeiro`:** (Etapa de codificação).
- [ ] **Homologação Final com a Diretoria:** (Sessão de validação visual).

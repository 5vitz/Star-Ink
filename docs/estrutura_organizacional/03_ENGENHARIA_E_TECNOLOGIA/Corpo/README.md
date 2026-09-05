# 📐 O Corpo do STAR INK (Arquitetura de Telas, UX/UI & Painel Admin)

Esta camada define a estrutura de telas, a experiência do usuário, a componentização autossuficiente e o planejamento do Painel Administrativo do **STAR INK**.

---

## 1. Modularidade & Componentização Autossuficiente

Para garantir **máxima independência e reutilização de código**:
* Cada componente em React/Next.js (ex: `ProductCard`, `CartDrawer`, `AdminSidebar`, `VariantSelector`) deve ser autossuficiente, encapsulando seu estilo em CSS Module próprio e tipagem TypeScript rigorosa.
* NENHUM componente deve ter acoplamento oculto com estados globais desnecessários.

---

## 2. Vitrine Principal & Card de Produto (9:16)

* **Grid Responsivo:** 3 colunas em desktop com respiro simétrico (24px gap).
* **Mídias Verticais 9:16:** Proporção ideal para Stories/Reels e Vitrine Balenciaga.
* **Inspeção Ativa:** Hover limpo; 1º clique ativa bordas contornadas e setas de navegação; 2º clique abre a página de detalhes do produto (`/produtos/[slug]`).

---

## 3. Planejamento do Painel de Controle Admin (`/admin`)

O Painel Administrativo será o centro de comando executivo da STAR INK, estruturado em **4 Módulos** e precedido pela **Página Inicial (Cockpit Executivo)**.

### 3.1. Arquitetura de Navegação & Top Header
* **Monograma STAR INK:** Monograma "S" deitado (Infinito / Alta Frequência) ancorando a marca no canto superior esquerdo.
* **Tabs Mestres de Navegação:**
  - `Dashboard` *(Home / Visão Geral)*
  - `1. Atendimento` *(SAC & CRM Concierge)*
  - `2. Produção` *(Esteira PoD / Reserva INK / Dimona)*
  - `3. Catálogo & Mídias` *(Artes, Prompts, Mídias & Feed Meta)*
  - `4. Financeiro` *(Margem Líquida & Bling ERP)*
* **Command Palette (`Ctrl + K` / `Cmd + K`):** Barra de busca inteligente e atalhos globais.

---

### 3.2. Os 4 Blocos da Página Inicial (`/admin/dashboard`)

```
+-----------------------------------------------------------------------------------------+
| [∞ STAR INK]  Dashboard  Atendimento  Produção  Catálogo  Financeiro  [Buscar Ctrl+K] 🔔|
+-----------------------------------------------------------------------------------------+
| [ Vendas Hoje: R$ 1.800 ] [ Lucro Real: R$ 1.250 ] [ PIX: 80% ] [ Em Produção: 12 pçs ] |
+----------------------------------------------------+------------------------------------+
| 🚨 ALERTAS DE AÇÃO IMEDIATA                        | 🧭 ACESSO RÁPIDO AOS MÓDULOS       |
| • 2 Pedidos PIX pendentes [Aprovar Pedido]         | [ Card 1: Atendimento Concierge ➔ ]|
| • 1 Dúvida de Tamanho WhatsApp [Responder]         | [ Card 2: Produção PoD ➔          ]|
|                                                    | [ Card 3: Catálogo & Mídias ➔     ]|
|                                                    | [ Card 4: Financeiro & Bling ➔    ]|
+----------------------------------------------------+------------------------------------+
| 📜 FEED DE ATIVIDADES EM TEMPO REAL (Activity Timeline)                                 |
| • 15:39 — Novo pedido #1234 recebido via PIX.                                           |
| • 15:38 — Peça 'Arte 02 - A Fada' enviada para impressão na Reserva INK.               |
| • 15:34 — Catalog XML sincronizado com o Instagram Shopping (Meta Commerce).           |
+-----------------------------------------------------------------------------------------+
```

1. **Bloco 1 (KPIs de Topo):** Vendas Hoje, Lucro Líquido Real (descontando custo fábrica R$ 49 e taxas), % PIX e Peças na Esteira.
2. **Bloco 2 (Alertas de Ação Imediata):** Decisões críticas que exigem intervenção direta da diretoria.
3. **Bloco 3 (Navegação Interativa):** Cards interativos para transição com 1-clique entre os 4 Módulos.
4. **Bloco 4 (Activity Timeline):** Feed cronológico com logs do ecossistema (vendas, estoque, envios e Meta Commerce).

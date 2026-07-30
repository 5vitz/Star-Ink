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

O Painel Administrativo será o centro de comando do lojista:

```
+-----------------------------------------------------------------------+
|  STAR INK ADMIN  |  [Vitrine]  [Estoque PoD]  [Agendamento]  [GEO]    |
+-----------------------------------------------------------------------+
|                                                                       |
|  Painel de Gestão Print on Demand (PoD 2.0)                           |
|  - Roteamento de Fornecedor por Item (Reserva INK / Dimona / Printful)|
|  - Agendamento por Drops no Instagram com Liberação Automática        |
|  - Gerenciador de Variáveis de Design System (Cores/Fontes)           |
|  - Auditoria de Indexação de IA (GEO / JSON-LD / llms.txt)            |
|                                                                       |
+-----------------------------------------------------------------------+
```

### 3.1. Funcionalidades do Admin:
1. **Cadastro e Roteamento de Produto:** Vincular o SKU ao fornecedor de manufatura correto.
2. **Agendamento por Drops:** Programar a data de liberação do produto no site e no Instagram.
3. **Gerenciador de Design System:** Ajustar cores e fontes do site sem relançar código.
4. **Monitor de GEO:** Visualizar se o JSON-LD do produto está válido para buscadores por IA.

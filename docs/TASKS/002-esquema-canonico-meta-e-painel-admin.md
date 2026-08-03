# 📋 TASK-002: Esquema Canônico Meta Commerce & Painel de Controle Multicanal

> **Status:** Ativa 🚀  
> **Responsáveis:** Genera (Visão de Produto & UX Admin) & Lincoln (Modelagem Prisma & Integradores)  
> **Arquitetura Base:** Padrão Meta Commerce Manager Specification  
> **Última Atualização:** Agosto de 2026  

---

## 🎯 Objetivos da Tarefa

1. **Modelagem de Dados Canônica (Camada Esqueleto 🦴):**
   * Estruturar o esquema de tabelas Prisma ORM (`Product`, `ProductVariant`, `ProductImage`, `Collection`) espelhando as especificações do Meta Commerce Manager.
   * Adicionar campos operacionais de negócio (`cost_price`, `supplier_provider`, `prompt_schema_url`).

2. **Geração de Feed Automático Meta / Instagram Shopping (Camada FluxoInformacao ⚡):**
   * Desenvolver a rota `/api/catalog/meta` em Next.js para servimento automático do feed XML (RSS 2.0 / Meta Spec).
   * Garantir compatibilidade nativa com Google Shopping (`JSON-LD`) para otimização GEO.

3. **Painel Admin Unificado (Camada Corpo 📐):**
   * Projetar a tela de cadastro de novos produtos no Painel Admin (`/admin/produtos/novo`).
   * Garantir que um único cadastro alimente o Banco de Dados, o Feed da Meta, o Bling ERP e a Vitrine 9:16 do site.

---

## 📋 Checklist de Execução

- [x] **Definir a Tese do Esquema Canônico:** [docs/ESTRATEGIA_DE_PRODUCAO_E_STARTUP.md](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/ESTRATEGIA_DE_PRODUCAO_E_STARTUP.md).
- [x] **Criar Documento da Task 002:** [docs/TASKS/002-esquema-canonico-meta-e-painel-admin.md](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/TASKS/002-esquema-canonico-meta-e-painel-admin.md).
- [ ] **Escrever o Schema Prisma (`schema.prisma`):** (Aguardando momento de codificação).
- [ ] **Criar a Rota do Feed XML Meta (`/api/catalog/meta`):** (Aguardando momento de codificação).
- [ ] **Desenvolver a Interface do Painel Admin (`/admin`):** (Aguardando momento de codificação).
- [ ] **Validar Integração no Meta Commerce Manager:** (Etapa final de homologação).

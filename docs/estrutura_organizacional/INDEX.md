# 🏛️ Estrutura Organizacional & Batalhão de Agentes — STAR INK LTDA

> **Website Oficial:** `www.star-ink.com.br`  
> **Modelo Operacional:** Solo-Founder Alavancado por Agentes de IA (Estoque Zero / PoD 2.0 Multi-Supplier)  
> **Filosofia Organizacional:** Prevenção de omissões operacionais, fiscais e jurídicas por automatização e delegação de funções com controle de permissões por departamento.  
> **Última Atualização:** Setembro de 2026  

---

## 📐 Visão Geral do Organograma

A **STAR INK** opera sob a liderança estratégica de seu Fundador e Diretor Criativo, respaldado pelo Orquestrador Executivo (Maestro Lincoln) que coordena 8 Batalhões Especializados de Agentes Virtuais alocados em seus respectivos diretórios de departamento.

```
                                  ┌──────────────────────────────────────────────┐
                                  │      01. DIRETORIA EXECUTIVA & ESTRATÉGIA    │
                                  │   (Armando Sinkovitz - Decisor Soberano +   │
                                  │     Maestro Lincoln - Orquestrador AGY)      │
                                  └──────────────────────┬───────────────────────┘
                                                         │
    ┌───────────────┬───────────────┬────────────────────┼────────────────────┬───────────────┬───────────────┬───────────────┐
    ▼               ▼               ▼                    ▼                    ▼               ▼               ▼               ▼
┌───────┐       ┌───────┐       ┌───────┐            ┌───────┐            ┌───────┐       ┌───────┐       ┌───────┐       ┌───────┐
│  02.  │       │  03.  │       │  04.  │            │  05.  │            │  06.  │       │  07.  │       │  08.  │       │INPI/  │
│JURÍD. │       │ENGENH.│       │OPERAÇ.│            │  SAC  │            │MKT &  │       │ATELIER│       │FINANC.│       │LGPD   │
└───────┘       └───────┘       └───────┘            └───────┘            └───────┘       └───────┘       └───────┘       └───────┘
```

---

## 🔒 Modelo de Permissões & Escopo por Departamento

Com a nova arquitetura física por diretórios, o sistema de permissões de acesso dos agentes fica totalmente simplificado e seguro:

* **Agentes da Diretoria (Maestro Lincoln):** Acesso global e orquestração.
* **Agentes de Engenharia (Inspetor de Códigos, Architects):** Acesso restrito ao diretório `03_ENGENHARIA_E_TECNOLOGIA/` e ao código fonte.
* **Agentes Jurídicos (Dr. Lex, Tax Bot):** Acesso restrito ao diretório `02_JURIDICO_E_COMPLIANCE/`.
* **Agentes de SAC (Discriminador, Concierge):** Acesso restrito ao diretório `05_SAC_E_DISCRIMINADOR/`.
* **Agentes de Marketing (Traffic, Curator, Content):** Acesso restrito ao diretório `06_MARKETING_E_GROWTH/`.
* **Agentes do Atelier (ASK Nexus, PLAN Narrative, Artwork Architect):** Acesso restrito ao diretório `07_ATELIER_DE_ARTES/`.
* **Agentes Financeiros (CFO Virtual, Reconciler, Price Engineer):** Acesso restrito ao diretório `08_FINANCEIRO_E_CONTABIL/`.

---

## 🔒 Regra de Governança de Infraestrutura & Deploy

> [!IMPORTANT]
> **DEPLOY EXCLUSIVO DO FUNDADOR:**  
> A execução de scripts de deploy (`deploy.sh`), atualizações no PM2 da VPS Contabo ou promoções para produção são de **EXCLUSIVIDADE DO FUNDADOR (ARMANDO SINKOVITZ)**.  
> Nenhum agente de IA ou assistente autônomo está autorizado a acionar deploys ou alterar infraestrutura remota sem comando manual direto do Fundador.  
> Para detalhamento completo da arquitetura e separação de papéis entre o Cockpit (Corpo) e os Agentes (Inteligência), consulte a [Proposta Funcional da Arquitetura Agêntica](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/PROPOSTA_ARQUITETURA_AGENTICA_E_GOVERNANCA.md).

---

## 🗺️ Matriz de Departamentos & Diretórios Físicos

| Departamento | Foco Principal | Diretório Físico | Agentes Alocados |
| :--- | :--- | :--- | :--- |
| **01. Diretoria Executiva** | Visão estratégica, crivo estético e caixa | `[01_DIRETORIA_EXECUTIVA/](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/01_DIRETORIA_EXECUTIVA/INDEX.md)` | Armando (Genera) + Maestro Lincoln |
| **02. Jurídico & Compliance** | Contratos JUCEES, INPI, LGPD e Compliance | `[02_JURIDICO_E_COMPLIANCE/](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/02_JURIDICO_E_COMPLIANCE/INDEX.md)` | Dr. Lex + Tax & Fiscal Bot |
| **03. Engenharia & TI** | Next.js 15, Prisma/Postgres, APIs & VPS | `[03_ENGENHARIA_E_TECNOLOGIA/](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/03_ENGENHARIA_E_TECNOLOGIA/INDEX.md)` | Inspetor de Códigos + Architects |
| **04. Operações & Logística** | Roteamento PoD, Reserva INK/Dimona & Frete | `[04_OPERACAO_E_LOGISTICA/](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/04_OPERACAO_E_LOGISTICA/INDEX.md)` | PoD Dispatch + Logistics Tracker |
| **05. SAC & Discriminador** | Triagem de ocorrências, trocas & WhatsApp 24/7 | `[05_SAC_E_DISCRIMINADOR/](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/05_SAC_E_DISCRIMINADOR/INDEX.md)` | Agente Discriminador + Concierge 24/7 |
| **06. Marketing & Growth** | Meta/Google Ads, GEO AI & Vitrine 9:16 | `[06_MARKETING_E_GROWTH/](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/06_MARKETING_E_GROWTH/INDEX.md)` | Traffic Manager + Curator + Content |
| **07. Atelier de Artes** | Criação visual autoral & Prompts JSON A3 | `[07_ATELIER_DE_ARTES/](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/07_ATELIER_DE_ARTES/INDEX.md)` | ASK Nexus + PLAN Narrative + Artwork |
| **08. Financeiro & Contábil** | DRE Gerencial, Unit Economics & Conciliação | `[08_FINANCEIRO_E_CONTABIL/](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/08_FINANCEIRO_E_CONTABIL/INDEX.md)` | CFO Virtual + Reconciler + Price Engineer |

---

## 📁 Links para os Diretórios Físicos

1. 👑 **[01. Diretoria Executiva & Estratégia](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/01_DIRETORIA_EXECUTIVA/INDEX.md)**
   * 📂 **[Pasta Lincoln (Contexto Inicial & Handover)](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/01_DIRETORIA_EXECUTIVA/Lincoln/SESSION_HANDOVER.md)**
2. ⚖️ **[02. Jurídico, Fiscal & Compliance](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/02_JURIDICO_E_COMPLIANCE/INDEX.md)**
3. 💻 **[03. Engenharia de Software, Codificação & TI](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/03_ENGENHARIA_E_TECNOLOGIA/INDEX.md)**
4. 📦 **[04. Operações, Logística PoD & Estoque](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/04_OPERACAO_E_LOGISTICA/INDEX.md)**
5. 🔍 **[05. Pós-Venda, SAC & Agente Discriminador](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/05_SAC_E_DISCRIMINADOR/INDEX.md)**
6. 📈 **[06. Marketing, Growth & Mídias](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/06_MARKETING_E_GROWTH/INDEX.md)**
7. 🎨 **[07. Atelier de Artes & Prompts](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/07_ATELIER_DE_ARTES/INDEX.md)**
8. 🏦 **[08. Financeiro, Contabilidade & Unit Economics](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/08_FINANCEIRO_E_CONTABIL/INDEX.md)**
9. 🎭 **[Central do Batalhão de Agentes (19 Agentes)](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura_organizacional/agentes/INDEX.md)**


# 📋 TASK-003: Módulo 1 — Atendimento Concierge & Arquitetura de IA 24/7

> **Status:** Ativa 🚀  
> **Responsáveis:** Genera (Regras de Negócio & Tom de Voz) & Lincoln (Engine de IA & Webhooks Meta)  
> **Arquitetura Base:** Contabo VPS 24/7 + Gemini API (Function Calling) + Meta WhatsApp Cloud API  
> **Última Atualização:** Agosto de 2026  

---

## 🎯 Objetivos da Tarefa

1. **Dashboard de Atendimento Concierge (`/admin/atendimento`):**
   - Tabela unificada de clientes e pedidos com ação de 1-Clique para WhatsApp.
   - Painel lateral *Slide-Over* com histórico do cliente (LTV, preferências de tamanho, notas privadas).
   - Central de troca e devolução automática (Logística Reversa Correios em 1-Clique).

2. **Atendimento Automatizado de IA 24/7 (Gemini API + Function Calling):**
   - Microserviço rodando 24 horas por dia na VPS Contabo escutando o Webhook da Meta WhatsApp API.
   - Atendimento elegante, educado e ágil no tom de voz da STAR INK.
   - Acesso seguro ao banco PostgreSQL via *Function Calling* (`consultar_pedido`, `solicitar_troca`, `escalar_humano`).

3. **Portal de Autoatendimento no Site (`star-ink.com.br/trocas`):**
   - Interface rápida para o cliente solicitar troca por tamanho ou devolução em 7 dias digitando apenas o CPF ou Pedido.
   - Geração automática de código de postagem gratuita nos Correios.

---

## 🏗️ Arquitetura Técnica do Agente de IA 24/7

```
 [ CLIENTE NO WHATSAPP (24/7) ]
               │
               ▼ (Webhook HTTPS)
 [ SERVIDOR CONTABO VPS (Node/Next.js) ]
               │
   ┌───────────┴───────────┐
   ▼                       ▼
[ GEMINI API ]    [ PRISMA POSTGRESQL ]
(Linguagem)       (Dados Seguros)
   │                       │
   └───────────┬───────────┘
               ▼
 [ RESPOSTA EM < 2 SEC ]
```

---

## 📋 Checklist de Execução

- [x] **Mapear Requisitos Funcionais e Não-Funcionais:** [docs/TASKS/003-modulo-1-atendimento-concierge-e-ia-24h.md](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/TASKS/003-modulo-1-atendimento-concierge-e-ia-24h.md).
- [x] **Gerar Mockup 2D do Módulo 1:** Renders do Dashboard SAC & CRM Concierge.
- [ ] **Configurar Meta WhatsApp Business API Cloud:** Vinculação com a Página do Facebook.
- [ ] **Criar Microserviço de Webhook na Contabo VPS:** (Etapa de codificação).
- [ ] **Desenvolver Prompt de Governança & Function Calling:** (Etapa de codificação).
- [ ] **Homologação em Ambiente Fechado (Genera + Lincoln):** (Testes finais).

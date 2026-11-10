# 🔄 Plano de Melhoria Contínua da Frota de Agentes (Metodologia Lincoln & Fine-Tuning Orientado à Intenção)

> **Empresa:** Star INK Ltda (`Star INK`)  
> **Metodologia de Treinamento:** Fine-Tuning Orientado à Intenção (Framework *It's Fine* do Prof. Dr. Sandeco Macedo)  
> **Filosofia de Gestão:** Metodologia Lincoln (*"Afiamos o machado primeiro para executar com precisão cirúrgica"*).  
> **Objetivo:** Treinamento, auditoria e evolução contínua da frota de 19 Agentes Virtuais de IA integrando a Tríade de Informação Proprietária (Tônica Espiritual, Terça Operacional e Quinta Financeira).

---

## 🏛️ A Tríade da Informação Proprietária (O DNA Vivo da Star INK)

A inteligência da frota é guiada por 3 arquivos canônicos de configuração situados em `src/config/`:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│              1. TÔNICA (NÍVEL ESPIRITUAL & IDENTIDADE - brand_dna.json)          │
│  • Estética da Subtração, Transparência Radical, Identidade pública "Assistente IA" │
│  • Manifesto de Matéria-Prima (Fibras Naturais Puras / Impressão DTG Ecológica)  │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────┴────────────────────────────────────────┐
│            2. TERÇA (NÍVEL OPERACIONAL & PRODUÇÃO - operational_spec.json)      │
│  • Matriz de Fornecedores PoD (Reserva INK / Hotprinti / Dimona)                │
│  • Fichas Técnicas por SKU, Gabaritos 4200x4800px @ 300 DPI, CDC Art. 49 / Trocas │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────┴────────────────────────────────────────┐
│     3. QUINTA (NÍVEL FINANCEIRO & GOVERNANÇA - financial_governance_spec.json)  │
│  • Unit Economics (Margem R$ 122/pç), Simples Nacional, NFe Bling ERP v3         │
│  • Protocolo JUCEES ESP2605453571, INPI 944841171, Trava Soberana do Fundador   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎓 Ciclo de Aprendizado via Framework *It's Fine* (11 Etapas)

O treinamento dos agentes transita da injeção de prompts para o aprendizado baseado nas decisões reais aprovadas pelo Fundador no Cockpit Admin (`/admin`):

1. **Intenção Mapeada:** Identificação do tipo de ocorrência por departamento.
2. **Curadoria do Acervo:** Consolidação do conhecimento nos 3 Níveis JSON.
3. **Captura Human-in-the-Loop:** Cada clique de aprovação (`[ 🟢 Aprovar ]`) grava o par `(Contexto + Prompt ➔ Resposta Ideal)`.
4. **Harness & Preparação:** Normalização dos datasets em formato JSONL.
5. **Fine-Tuning Privado:** Ajuste fino via LoRA/QLoRA em modelos locais ou VPS.
6. **Deploy Soberano:** Liberação manual e exclusiva do Fundador (Armando).

---

## 🤖 Identidade Pública & Tom de Atendimento

* **Identidade Pública Oficial:** **Assistente IA Star INK** (ou **Atendente IA Star INK**).
* **Diretriz de Transparência Radical:** A IA se identifica abertamente como inteligência artificial. *Não simulamos ser um ser humano; entregamos atendimento rápido, cortês, empático e resolutivo.*

---

## 🛠️ Injeção de Contexto em Cascata (`src/lib/brandContext.ts`)

Todos os agentes carregam o contexto em cascata via utilitário centralizado:
```typescript
import { getFormattedPromptContext } from '@/lib/brandContext';
const promptContext = getFormattedPromptContext('sac'); // Injeta Tônica + Operacional
```

---

## 📊 Critérios Globais de Desempenho (KPIs)

* **Transparência & Cortesia (SAC):** 100% de identificação como Assistente IA e atendimento cortês.
* **Respeito ao Mínimo Diff (Engenharia):** 0% de alterações desnecessárias em código funcional.
* **Fidelidade Fiscal (Jurídico):** 100% de emissão correta de NFe 55 no Bling ERP sem divergência.
* **Precisão de Triagem (Operações):** > 98% de assertividade ao classificar Defeito Reserva INK (Reprint R$ 0) vs. Troca por tamanho.
* **Rigor Estético (Atelier):** 100% de conformidade com a Estética da Subtração e traço 1px hairline.

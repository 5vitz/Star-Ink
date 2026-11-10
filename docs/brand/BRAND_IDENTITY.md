# 💎 Identidade da Marca & A Tríade da Informação Proprietária — Star INK

> **Razão Social:** Studio X Ltda  
> **Nome Fantasia:** Star INK  
> **Filosofia Central:** Estética da Subtração & Metodologia Lincoln  
> **Identidade Pública de IA:** Assistente IA Star INK  

---

## 🎼 A Tríade da Informação Proprietária

A **Star INK Ltda** organiza a sua Informação Proprietária em 3 Níveis Harmônicos (Tônica, Terça e Quinta), estruturados nos arquivos em `src/config/`:

### 1. 🕊️ Nível 1 — Tônica (Nível Espiritual & Identidade) | `src/config/brand_dna.json`
* **Definição:** É a alma e o tom da marca que permeiam todos os departamentos.
* **Princípios:**
  * **Transparência Radical:** A marca assume abertamente o uso da Inteligência Artificial. O agente se identifica como **Assistente IA Star INK**. Não simulamos ser um ser humano; atendemos com empatia, cortesia e máxima eficiência.
  * **Estética da Subtração:** Valorização do essencial, eliminação do ruído visual, traço 1px hairline e espaços em branco intencionais.
  * **Manifesto da Matéria-Prima:** Uso exclusivo de fibras naturais puras (Algodão Pura Fibra Penteado) e tecnologia de impressão DTG ecológica sem toque de plástico/emborrachado.

### 2. 📦 Nível 2 — Terça (Nível Operacional & Produção) | `src/config/operational_spec.json`
* **Definição:** É a manifestação física dos produtos e a esteira logística de atendimento.
* **Fornecedores PoD:** Reserva INK (Fornecedor Principal de Vestuário), Hotprinti / Dimona (Quadros Fine Art A3, Ecobags Lona, Linha Prata 3D).
* **Especificações por SKU:**
  * Camiseta Oversized: Algodão Pura Fibra Penteado 220g/m² (Fio 26.1).
  * Moletom Heavyweight: Algodão Flanelado 320g/m².
  * Quadro Fine Art A3: Papel Algodão 300g/m² (30x42 cm).
* **Garantia & Trocas:** Defeito de fabricação ➔ Reprint Reserva INK 100% gratuito (R$ 0 para a Star INK); Troca por tamanho/desistência ➔ Portal `/trocas` (CDC Art. 49).

### 3. 🏦 Nível 3 — Quinta (Nível Financeiro, Fiscal & Governança) | `src/config/financial_governance_spec.json`
* **Definição:** É a sustentação matemática, a blindagem jurídica e a governança de gestão da marca.
* **Empresa & Registros:** CNPJ `01.376.773/0001-30` (100% ATIVO), Protocolo JUCEES `ESP2605453571`, Marca INPI `944841171`.
* **Unit Economics:** Preço final R$ 189 - R$ 219, custo PoD R$ 67 - R$ 75, margem líquida alvo de R$ 122,00 por peça vendida.
* **Soberania do Fundador:** Execução de scripts de deploy (`deploy.sh`), modificações no PM2 e banco de dados de produção são de **exclusividade soberana do Fundador (Armando Sinkovitz)**. IAs nunca executam deploys autônomos.

---

## 💻 Arquitetura de Injeção nos 19 Agentes

O módulo `src/lib/brandContext.ts` lê os 3 arquivos JSON e os injeta em cascata nos System Prompts dos 19 Agentes Virtuais de IA da **Star INK**.

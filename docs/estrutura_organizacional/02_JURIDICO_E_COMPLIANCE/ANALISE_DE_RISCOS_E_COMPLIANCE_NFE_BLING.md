# ⚖️ AUDITORIA & COMPLIANCE 360° — STAR INK LTDA
## Governança Jurídica, Fiscal, Tributária, Financeira & Regulatória

> **Elaborada por:** Dr. Lex (JusChat GraphRAG / Agente Jurídico) & Maestro Lincoln  
> **Empresa:** STUDIO X LTDA / STAR INK LTDA (`CNPJ 01.376.773/0001-30`)  
> **Escopo:** Mapeamento integral e preventivo em todas as 5 esferas de atuação empresarial para eliminar travamentos, multas, desenquadramentos tributários e passivos jurídicos.  
> **Última Atualização:** Agosto de 2026  

---

## 🏛️ 1. Esfera Societária & Corporativa

| Requisito / Item | Regra Legal / Norma | Risco se não Atendido | Ação de Compliance STAR INK |
| :--- | :--- | :--- | :--- |
| **Consolidação SLU** | Art. 1.052, § 1º e 2º do Código Civil (Lei 13.874/2019) | Perda da proteção patrimonial limitada se houver confusão societária. | Alteração contratual na JUCEES consolidando a SLU com 100% de capital (Armando Sinkovitz). |
| **Capital Social** | Integralização no Contrato Social | Exigência de cobrança de integralização não comprovada. | R$ 10.000,00 100% integralizado em moeda corrente. |
| **Recadastramento de Matriz** | Resolução JUCEES / REDESIM | Bloqueio sistêmico na emissão de FCN e certidões. | **Solicitação de Atualização de Matriz transmitida com sucesso na JUCEES.** |
| **Endereço Comercial** | Cadastro na Sede (Vitória-ES) | Incompatibilidade de alvará municipal ou notificação tributária. | Endereço regularizado em edifício comercial no bairro Enseada do Suá. |

---

## 💰 2. Esfera Tributária & Fiscal (Federal, Estadual e Municipal)

### 🟢 2.1. Opção Formal pelo Simples Nacional
* **Regra Tributária:** O enquadramento no **Simples Nacional** não é automático após a alteração. A opção deve ser formalizada no Portal do Simples Nacional (`www8.receita.fazenda.gov.br/SimplesNacional`).
  * **Empresas com nova I.E./Inscrição:** O pedido deve ser feito em até 30 dias após o deferimento das inscrições (municipal/estadual), respeitado o limite de 180 dias da abertura inicial.
  * **Prazo Geral:** No mês de **Janeiro** de cada ano tributário.
* **Alíquota Inicial:** **Anexo I (Comércio)** com alíquota nominal inicial de **4,00%** no PGDAS-D.
* **Risco de Desenquadramento:** Excesso de débitos não parcelados ou ausência da transmissão da DEFIS anual gera exclusão ex-officio do Simples Nacional e migração forçada para o Lucro Presumido (~15%+ de tributação).

### 🟡 2.2. Obrigações Acessórias Federais & Estaduais
1. **PGDAS-D (Mensal):** Declaração mensal das vendas brutas até o dia 20 de cada mês para geração da guia única DAS.
2. **DEFIS (Anual):** Declaração de Informações Socioeconômicas e Fiscais entregue até 31 de Março do ano seguinte.
3. **DCTFWeb / EFD-Reinf / eSocial:** Transmitidas nos meses em que houver pagamento de Pró-Labore ou distribuição de lucros.
4. **Sintegra / EFD ICMS (Estadual ES):** Como optante do Simples Nacional no ES, a empresa entrega as informações resumidas via DAS e mantém o livro de inventário atualizado.

---

## 🎨 3. Esfera de Propriedade Intelectual & Marcas (INPI)

| Ativo de Marca | Registro Legal | Status / Risco | Diretriz de Compliance |
| :--- | :--- | :--- | :--- |
| **Marca STAR INK** | INPI Processo Nº `944841171` (Protocolo `850260415642`) | **Protocolado & GRU R$ 440,00 Paga!** | Prioridade nacional garantida na Classe 25 (Vestuário). Monitorar RPI semanalmente. |
| **Autoria das Artes por IA** | Prompts Autorais arquivados em JSON com *seeds* | Risco de alegação de cópia ou falta de originalidade. | Arquivamento do `prompt_autoral.json` com amparo jurídico de autoria do prompt. |
| **Handle do Instagram** | `@starink` (atualmente `@starink.oficial`) | Terceiro ocupando nome sem registro no INPI. | Acionar Meta Legal Trademark com a publicação no RPI para migrar o handle `@starink`. |

---

## 🛡️ 4. Esfera de Direito do Consumidor (CDC) & LGPD

### ⚖️ 4.1. Código de Defesa do Consumidor (Lei 8.078/1990)
* **Direito de Arrependimento (Art. 49):** O cliente tem **7 dias corridos** após o recebimento para solicitar devolução sem justificativa com **100% de reembolso** (incluindo o frete de devolução).
* **Troca por Defeito (Art. 26):** Garantia legal de **90 dias** para produtos duráveis (vestuário/moda).
* **Solução Tech STAR INK:** Portal `/trocas` integrado à API do **Melhor Envio** para disparo de etiqueta de logística reversa sem custo de atendente.

### 🔒 4.2. Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)
* **Consentimento de Cookies:** Banner ativo no e-commerce D2C solicitando aceite explícito para cookies de analytics e remarketing (Meta Pixel / Google Ads).
* **Políticas Públicas Expostas:** Páginas obrigatórias com Schemas JSON-LD ativas:
  * `/politica-de-privacidade` (LGPD)
  * `/politica-de-devolucao` (Trocas & CDC)
  * `/termos-e-condicoes` (Termos de Compra)
  * `/duvidas-frequentes` (FAQPage)

---

## 💳 5. Esfera Financeira, Bancária & Pró-Labore

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             PRINCÍPIO DA ENTIDADE                                │
│       CONTA PESSOA JURÍDICA (PJ)            vs.       CONTA PESSOA FÍSICA (PF)   │
│       (STAR INK LTDA)                                 (Armando Sinkovitz)        │
└──────────────────────────┬───────────────────────────────────────┬───────────────┘
                           │                                       │
                           ▼                                       ▼
             Recebimentos de Vendas D2C,              Retirada de Pró-Labore
             Fornecedores PoD & Impostos              com INSS (11%) & Lucro
             (Asaas / Mercado Pago PJ)                100% Isento no IRPF
```

1. **Separação Rigorosa de Contas (Princípio da Entidade):** 100% das vendas da loja D2C, Mercado Livre, Amazon e fornecedores (Reserva INK/Dimona) entram e saem exclusivamente pela **Conta Bancária PJ**.
2. **Pró-Labore:** Fixação de Pró-Labore mensal para o Sócio-Administrador (Armando Sinkovitz) com recolhimento de **11% de INSS**, garantindo a qualidade de segurado do INSS e aposentadoria.
3. **Distribuição de Lucros Isenta:** O lucro líquido apurado na contabilidade (após o DAS do Simples) é transferido para a conta PF do sócio com **100% de isenção no Imposto de Renda Pessoa Física (IRPF)** (Art. 14 da Lei Complementar nº 123/2006).

---

## 🎯 Resumo de Governança 360°

Com esta matriz de compliance integrada, a **STAR INK LTDA** opera com:
1. **Societário:** 100% regularizado em SLU.
2. **Tributário:** Simples Nacional Anexo I (4%).
3. **Fiscal:** NFe Bling ERP e I.E. SEFAZ-ES ativas.
4. **Propriedade Intelectual:** Marca registrada no INPI e artes blindadas.
5. **Financeiro/Jurídico:** Pró-Labore regular, lucro isento e conformidade com CDC e LGPD.

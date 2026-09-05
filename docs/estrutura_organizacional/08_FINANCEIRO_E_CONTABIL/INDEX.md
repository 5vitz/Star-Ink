# 🏦 08. Departamento Financeiro, Contabilidade & Unit Economics

> **Website Oficial:** `www.star-ink.com.br`  
> **CNPJ:** `01.376.773/0001-30` (STAR INK LTDA)  
> **Agentes de IA Alocados:** CFO Virtual & FP&A, Financial Reconciler Agent, Price & Unit Economics Engineer (com suporte do Tax & Fiscal Bot)  
> **Objetivo:** Gestão cirúrgica de caixa, conciliação bancária de repasses multicanal (D2C e marketplaces), apuração de impostos no Simples Nacional, auditoria de margem líquida por peça (Unit Economics) e projeção de fluxo de caixa para a fábrica DTG própria em 2027.  

---

## 🏛️ Atribuições & Escopo

1. **Gestão de Contas a Pagar & Custos Operacionais:** Conciliação das faturas PoD dos fornecedores industriais (Reserva INK, Dimona), licenças SaaS/VPS (Contabo) e controle de compras de insumos de embalagem (Sacos Ziplock foscos, cartões A6, tags).
2. **Gestão de Contas a Receber & Repasses Multicanal:** Acompanhamento da liquidação de vendas D2C (Pix instantâneo D+0 vs. Cartão D+14/D+30) e repasses das plataformas parceiras (Mercado Livre, Amazon Brasil, Shopee, SHEIN, TikTok Shop).
3. **Conciliação Financeira Automatizada:** Auditoria pedido a pedido comparando os valores transacionados no e-commerce com os extratos bancários de liquidação PJ, identificando e alertando sobre eventuais retenções ou divergências de centavos.
4. **Fiscal, Tributário & Integração Contábil:** Cálculo do DAS no Simples Nacional (Anexo I ~4%) e exportação automatizada dos arquivos XML de NFe (Modelo 55) e relatórios financeiros do Bling ERP para a contabilidade externa parceira.
5. **Unit Economics & DRE Gerencial em Tempo Real:** Calculadora de margem de contribuição líquida real por SKU (R$ 122,00/peça no modelo base), definição do Breakeven ROAS para a equipe de tráfego e relatório mensal de DRE Gerencial.

---

## 🛡️ Mecanismos Anti-Omissão (Prevenção de Falhas)

| Risco de Omissão | Mecanismo Preventivo Automatizado | Ação de Emergência |
| :--- | :--- | :--- |
| **Divergência de Taxa em Repasse de Marketplace** | O `Financial Reconciler Agent` compara o valor líquido retido por cada plataforma com a tabela de comissões acordada. | Alerta imediato no Dashboard e notificação ao suporte da plataforma. |
| **Estouro do Custo de Aquisição (CAC / Tráfego Pago)** | O `Price & Unit Economics Engineer` calcula o Breakeven ROAS diário e sincroniza com o `Traffic Manager`. | Pausa automática ou ajuste de lances de anúncios que operem com prejuízo. |
| **Atraso na Apuração do DAS Simples Nacional** | O `Tax & Fiscal Bot` consolida as vendas do mês no Bling ERP no 1º dia útil e agenda a guia DAS antes do vencimento (dia 20). | Notificação direta com botão de 1-clique para autorização de pagamento no banco. |

---

## 🤖 Agentes de IA Alocados

* 💰 **CFO Virtual & FP&A Agent (`17_cfo_virtual_agent.md`):** Diretor financeiro virtual encarregado da DRE Gerencial, projeção de caixa, controle da meta de R$ 60k/R$ 40k no Q4 e fundo de reserva para o maquinário DTG 2027.
* 🔄 **Financial Reconciler Agent (`18_financial_reconciler.md`):** Auditor de conciliação financeira de alta precisão que compara pedidos, extratos bancários e repasses de gateways/marketplaces.
* 🧮 **Price & Unit Economics Engineer (`19_unit_economics_engineer.md`):** Engenheiro de precificação que governa a API `/api/financials/dre` e simula margens por produto.
* 🧾 **Tax & Fiscal Bot (`03_tax_fiscal_bot.md`):** Auditor fiscal em sinergia com o departamento para emissão de NF-e e apuração do Simples Nacional no Bling ERP.

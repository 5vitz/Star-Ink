# 🚀 Roadmap Estratégico de Lançamento & Marketing Q4 (Star-Ink)

**Data Alvo de Lançamento (Go-Live):** 12 de Outubro de 2026 (Segunda-Feira / Feriado Nacional)  
**Meta Comercial de Dezembro:** 420+ camisetas vendidas (R$ 60.000,00+ Faturamento Bruto / R$ 40.000,00+ Lucro Líquido para quitação/autofinanciamento do setup DTG próprio)

---

## 💎 Posicionamento de Produto & Filosofia de Marca

1. **Qualidade Superior de Impressão (100% DTG - Direct to Garment):**
   * Compromisso inegociável com a saúde e o conforto do cliente.
   * Recusa total de estampas de vinil/plastisol emborrachadas e pesadas que impedem a respiração da pele e craquelam.
   * Impressão direta no tecido (DTG) que tinge a própria fibra do algodão, mantendo a malha macia, fresca e durável.

2. **Exclusividade e Matéria-Prima:**
   * Foco estrito em **Algodão 100% Pura Fibra** de alta gramatura.
   * Coleções autorais geradas por Engenharia de Prompt e IA, com amparo jurídico de autoria (prova de autoria pelo Prompt Autoral).

---

## 🗓️ Cronograma Cronológico de Execução (6 Semanas de Reta Final)

> **Filosofia de Trabalho:** Primeiro consolidar toda a infraestrutura burocrática, fiscal e de integrações ("resolver o chato") para depois focar com tranquilidade na criação das 12 artes autorais e montar o catálogo ("curtir o gostoso").

```
Semana 1 (28/Ago - 04/Set): Deferimento JUCEES, IE, e-CNPJ A1 e Publicação INPI
Semana 2 (05/Set - 11/Set): Migração de Canais (CPF -> CNPJ STAR INK LTDA) & Bling ERP v3
Semana 3 (12/Set - 18/Set): Roteamento PoD Multi-Supplier, Matriz Canônica & Testes de Ponta a Ponta
Semana 4 (19/Set - 25/Set): Criação Artística das 12 Artes Autorais do Drop 01 & JSON Prompts
Semana 5 (26/Set - 02/Out): Catálogo Comercial D2C (/admin/catalogo) & Mockups WebP 9:16
Semana 6 (03/Out - 11/Out): Aquecimento VIP Gate, Pixels de Anúncio & Tráfego Pago
-------------------------------------------------------------------------------
12/OUTUBRO (Segunda-Feira / Feriado): 🟢 GO LIVE OFICIAL
```

### 📋 Detalhamento das Fases

#### Fase 1: Base Fiscal & Jurídica (Semanas 1 e 2 - Agosto)
- **Regularização do CNPJ:** Acompanhamento da transmissão da DCTF Inativa/Pendências do CNPJ `01.376.773/0001-30` (Studio X LTDA) via e-CAC em horário comercial para alteração do status para **ATIVO**.
- **Alteração Contratual na JUCEES:** Protocolo de alteração de razão social para **STAR INK LTDA** e inclusão dos CNAEs:
  - `4781-4/00` (Comércio Varejista de Artigos do Vestuário e Acessórios)
  - `7410-2/02` (Design Gráfico e Criação de Artes)
- **Inscrição Estadual (SEFAZ/ES):** Emissão automática da IE para habilitação da Nota Fiscal Eletrônica (NF-e Modelo 55).

#### Fase 2: Front-End D2C, Matriz de SKUs & Catálogo Drop 01 (Semanas 3 e 4 - Agosto)
- **Design System D2C & Vitrine 9:16:**
  - Redesign do card público em proporção 9:16 com área de imagem superior 3:4 e caixa de texto branca inferior ([ProductCard.tsx](file:///home/artz/Documentos/Antigravity/Star-Ink/src/components/catalog/ProductCard.tsx)).
- **Arquitetura de Catálogo em 2 Divisões (`/admin/catalogo`) ✅:**
  - **Divisão 1 (`ArtworksProductionModule.tsx`)**: Gestão de Artes Matrizes 300DPI (4200x4800px PNG transparente), Prompts JSON A3 e fornecedor preferencial.
  - **Divisão 2 (`ShowcaseCatalogModule.tsx`)**: Aplicação comercial das artes em suporte físico (Camiseta, Moletom, Bermuda, Quadro Fine Art A3, Ecobag), mídias WebP 9:16, preços retail/PIX e rastreabilidade por Nome e Data do Drop.
- **Roteamento Multi-Fornecedor & Reserva INK ✅:**
  - Estrutura física de pastas `FORNECEDORES/Reserva INK/` (`Artes/`, `Especificacoes_e_Gabaritos/`, `Recibos/`).
  - [MANUAL_TECNICO_RESERVA_INK.md](file:///home/artz/Documentos/Antigravity/Star-Ink/FORNECEDORES/Reserva%20INK/Especificacoes_e_Gabaritos/MANUAL_TECNICO_RESERVA_INK.md) padronizado.
  - Schema Prisma atualizado com tabela `Artwork` e campos `productType`, `supplierProvider`, `supplierSku`, `printFileUrl`.

#### Fase 3: Bling ERP & Integrações (Semanas 5 e 6 - Setembro)
- **Configuração do Bling ERP:** Cadastro emitente STAR INK LTDA, certificado A1, regimes de tributação e emissão NFe.
- **Homologação dos Canais de Venda:**
  - Loja D2C própria + Mercado Livre, Amazon Brasil e Shopee.
  - Desbloqueio e integração com **SHEIN Seller Center** e **TikTok Shop**.
  - Conexão de meios de pagamento PJ (Asaas / Mercado Pago) e logística (Melhor Envio / Frenet).

#### Fase 4: Testes de Ponta a Ponta & Aquecimento (Semanas 7 e 8 - Final de Setembro)
- Simulação completa do fluxo de vendas e envio.
- Instalação e teste de Pixels de Conversão (Meta Ads, Google Shopping, TikTok Ads).
- Preparação de criativos de anúncio (bastidores por IA, manifesto da marca, qualidade do algodão 100%).
- Ativação de conta e Token de API do **Melhor Envio** para disparo automático de Código de Logística Reversa de Trocas no portal `/trocas` (R$ 0,00 de custo fixo).

---

## 🎯 Estratégia de Marketing e Reinvestimento Q4

```
[OUTUBRO: Atração & Dados] ➔ [NOVEMBRO: Aquecimento & Base] ➔ [DEZEMBRO: Colheita (420+ peças)]
```

### 📍 Outubro: Fase de Atração e Treinamento dos Algoritmos
* **Reinvestimento:** **100% da margem bruta reinvestida em Tráfego Pago.**
* **Foco:** Anúncios de Topo de Funil (Meta Ads e Google Shopping), captação de tráfego qualificado e "treinamento" dos pixels de conversão.

### 📍 Novembro: Fase de Aquecimento e Lista VIP
* **Reinvestimento:** **100% da margem operacional mantida em tráfego.**
* **Foco:** Remarketing para visitantes de Outubro, validação dos Bestsellers do Drop 01 e criação da Lista VIP de Natal (WhatsApp/E-mail).

### 📍 Dezembro: Fase de Colheita de Natal e Fim de Ano 🎄💥
* **Meta Comercial:** Vender **420+ camisetas** no mês (média de apenas 13 a 14 peças por dia).
* **Faturamento Bruto Projetado:** R$ 60.000,00+
* **Lucro Líquido Projetado:** R$ 40.000,00+ *(destinado a quitação/autofinanciamento do setup DTG próprio)*.

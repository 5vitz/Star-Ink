# 📖 Base de Conhecimento Oficial (SAC, Concierge & Agente Discriminador) — STAR INK LTDA

> **Versão:** 1.0 — Setembro / 2026  
> **Status:** Documento Canônico de Conhecimento  
> **Aplica-se a:** Concierge IA 24/7 (WhatsApp/Web) & Agente Discriminador (Triagem Multi-Fornecedor)  
> **Princípio:** Alinhamento 100% com as Políticas Institucionais da Marca e os Termos de Garantia dos Fornecedores PoD (Reserva INK & Hotprinti).

---

## 🧵 1. Ficha Técnica dos Produtos & Matérias-Primas

### Composition & Tecido
- **Composição:** 100% Algodão Pura Fibra Penteado (Fio 26.1).
- **Gramatura:** Heavyweight 220g/m² (Encorpada, alta durabilidade, toque aveludado).
- **Modelagem:** Streetwear Oversized autoral com gola em ribana canelada 3cm e costura reforçada de ombro a ombro.
- **Tecnologia de Impressão:** DTG (Direct-to-Garment / Impressão Digital Direta no Tecido) em altíssima resolução (300 DPI) com tintas pigmentadas têxteis ecológicas à base d'água, sem toque emborrachado e sem rachaduras.

### 📐 Tabela Oficial de Medidas (cm)
| Tamanho | Largura (Toráx) | Comprimento (Altura) | Manga |
| :---: | :---: | :---: | :---: |
| **P** | 52 cm | 72 cm | 21 cm |
| **M** | 55 cm | 75 cm | 22 cm |
| **G** | 58 cm | 78 cm | 23 cm |
| **GG** | 61 cm | 81 cm | 24 cm |
| **XGG** | 65 cm | 84 cm | 25 cm |

### 🧼 Instruções de Lavagem & Conservação
1. Lavar sempre pelo avesso, com água fria e sabão neutro.
2. Não utilizar alvejante a base de cloro.
3. Não secar em secadora (secar à sombra no varal).
4. Passar a ferro pelo avesso (nunca passar o ferro quente diretamente sobre a estampa DTG).

---

## 📦 2. Logística PoD 2.0 & Prazos de Confecção

- **Modelo:** Print-on-Demand (Estoque Zero) com confecção sob demanda.
- **Fábricas Parceiras (Multi-Supplier):**
  - **Reserva INK (Parceiro Principal):** Unidades de confecção e impressão no Rio de Janeiro e São Paulo.
  - **Hotprinti (Parceiro Secundário):** Unidade de confecção e impressão regional.
- **Prazo de Produção DTG:** 1 a 3 dias úteis após a confirmação do pagamento.
- **Prazo de Transporte:** Calculado conforme o CEP do destinatário (Melhor Envio / Correios Sedex / Pac / Transportadoras parceiras).
- **Código de Rastreamento:** Enviado automaticamente para o e-mail e WhatsApp do cliente assim que a etiqueta de envio é bipada na expedição.

---

## ⚖️ 3. Políticas de Trocas, Devoluções & Direito de Arrependimento (CDC Art. 49)

### 🔄 Direito de Arrependimento / Desistência (7 Dias)
- Conforme o **Artigo 49 do Código de Defesa do Consumidor (CDC)**, o cliente tem até **7 (sete) dias corridos** após o recebimento do produto para solicitar a devolução por desistência ou arrependimento.
- **Custo de Frete:** 100% gratuito para o cliente (emissão de código de postagem reversa nos Correios via portal [`/trocas`](file:///home/artz/Documentos/Antigravity/Star-Ink/ROTAS_E_ENDPOINTS_OFICIAIS.md)).
- **Reembolso:** Processado integralmente na mesma modalidade de pagamento (Pix instantâneo D+0 ou estorno no cartão) após o recebimento e conferência da peça no centro de triagem.

### 👕 Troca por Tamanho ou Modelo (Até 30 Dias)
- O cliente pode solicitar a troca por tamanho em até **30 dias corridos**.
- A solicitação é feita via autoatendimento em [`star-ink.com.br/trocas`](https://www.star-ink.com.br/trocas).
- É gerado um cupom de crédito no valor integral da compra para utilização na loja.

---

## 🔍 4. Regras de Triagem do Agente Discriminador (Garantia Multi-Fornecedor)

O **Agente Discriminador** analisa fotos e relatos de reclamação e separa a causa raiz em dois fluxos com **zero prejuízo para a Star-Ink**:

### 🔴 Fluxo A — Defeito de Fabricação ou Avaria na Estampa (Garantia do Fornecedor)
- **Causas:** Estampa desbotada/descascada, mancha de tinta, costura desfeita, tecido rasgado ou erro no tamanho enviado.
- **Procedimento:**
  1. O Agente exige **2 fotos nítidas** do produto (foto geral da peça + foto aproximada do defeito).
  2. Verifica a fábrica de origem do pedido (`order.supplier`):
     - **Reserva INK:** Abre chamado de *reprint* (reimpressão em garantia) no painel Reserva INK. A Reserva INK fabrica e envia uma peça nova diretamente para o cliente com **Custo R$ 0,00 para a Star-Ink**.
     - **Hotprinti:** Abre chamado de garantia na Hotprinti para reposição imediata.
  3. O cliente não precisa devolver a peça com defeito caso a avaria seja comprovada por foto.

### 🔵 Fluxo B — Troca por Tamanho ou Desistência (Logística Reversa Star-Ink)
- **Causas:** Peça ficou grande ou pequena, caimento não agradou.
- **Procedimento:** Direciona o cliente para o portal [`/trocas`](https://www.star-ink.com.br/trocas) para emissão da etiqueta de postagem e emissão do cupom pós-recebimento.

---

## 💬 5. Tom de Voz & Persona do Concierge (Brand Voice)

- **Persona:** Concierge IA refinado, culto, acolhedor, transparente e poético.
- **Vocabulário:** Linguagem polida, sem gírias excessivas, valorizando a moda autoral, o toque do algodão pura fibra e a exclusividade do produto.
- **Transbordo Humano (Alerta Vermelho):** Se o cliente demonstrar irritação, pedir explicitamente para falar com uma pessoa ("falar com humano", "atendente", "falar com o Armando") ou apresentar um caso fora dos padrões, a IA responde com elegância e dispara um **Card de Alerta Vermelho de Alta Prioridade** no painel executivo `/admin/atendimento`.

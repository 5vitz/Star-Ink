# 📋 Especificação Técnica: Formulário Canônico Unificado & Publicador Multicanal

> **Website Oficial:** `www.star-ink.com.br`  
> **Arquitetura Base:** Single Source of Truth (Fonte Única da Verdade)  
> **Finalidade:** Cadastrar o produto 1 única vez no painel e publicar automaticamente no E-commerce, Bling ERP API v3, Meta Commerce (Instagram/Facebook Shopping) e Marketplaces.  
> **Última Atualização:** 5 de Agosto de 2026  

---

## 🏛️ 1. Visão Geral da Arquitetura

O **Formulário Canônico Unificado** elimina a redundância operacional no cadastro de produtos. Ele coleta a união de todas as propriedades exigidas por cada canal e distribui os dados de forma assíncrona.

```
                       ┌─────────────────────────────────────────┐
                       │ FORMULÁRIO CANÔNICO MESTRE STAR INK     │
                       │ Preenchido 1 ÚNICA VEZ em /admin        │
                       └────────────────────┬────────────────────┘
                                            │
                                            ▼
                       ┌─────────────────────────────────────────┐
                       │ BANCO DE DADOS CENTRAL (POSTGRESQL)     │
                       └────────────────────┬────────────────────┘
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         │                                  │                                  │
         ▼                                  ▼                                  ▼
 ┌───────────────┐                  ┌───────────────┐                  ┌───────────────┐
 │ 1. VITRINE    │                  │ 2. BLING ERP  │                  │ 3. INSTAGRAM  │
 │ (Next.js 15)  │                  │ (API v3 Hub)  │                  │ & META COMM.  │
 │ Exibe a peça  │                  │ Distribui para│                  │ Sacolinha no  │
 │ no e-commerce │                  │ ML, Amazon,   │                  │ Insta e Posts │
 │ com fotos 9:16│                  │ Shopee, Shein │                  │ de Campanha   │
 └───────────────┘                  └───────────────┘                  └───────────────┘
```

---

## 📝 2. Dicionário de Dados do Formulário Unificado (Superset)

O formulário contém 4 blocos funcionais de propriedades:

### Bloco A: Identificação & Narrativa Autoral (Site & Instagram)
* `title`: Nome comercial do produto (ex: *Camiseta Oversized — A Fada*).
* `chapter`: Capítulo do Drop (ex: *Capítulo II: Entidades & Mística*).
* `description`: Texto poético autoral do conceito da estampa.
* `gender_target`: Segmentação de público (`Masculino`, `Feminino`, `Unissex`).
* `brand`: Marca oficial (`STAR INK`).

### Bloco B: Mídias & Arquivos de Produção (Site, Insta & PoD)
* `media_lookbook_9x16`: Galeria de fotos cinematográficas de modelos (proporção 9:16).
* `media_flat_mockup`: Imagem flat da peça isolada.
* `pod_master_png_url`: Link para o arquivo PNG A3 transparente em 300 DPI (3508x4960px) de alta resolução para envio à fábrica PoD.

### Bloco C: Dados Fiscais & Financeiros (Bling ERP & SEFAZ)
* `price_retail`: Preço final de venda no e-commerce (ex: `R$ 180,00`).
* `cost_factory_pod`: Custo de fabricação PoD (ex: `R$ 49,00`).
* `ncm_code`: Código de Nomenclatura Comum do Mercosul (ex: `6109.10.00` para camisetas de algodão).
* `origin_code`: Origem da mercadoria (`0` - Nacional).
* `tax_simples_percent`: Alíquota de imposto Simples Nacional (ex: `4.0%`).

### Bloco D: Grade de Tamanhos & Matriz de Estoque (Marketplaces & Bling)
* `master_sku`: Código SKU pai mestre (ex: `STINK-TSHIRT-FADA-02`).
* `variants`: Grade gerada automaticamente com SKUs filhos (`P`, `M`, `G`, `GG`, `XGG`).
* `approved_colors`: Cores de tecido homologadas na curadoria (`Preto`, `Off-White`).
* `weight_grams`: Peso do produto para frete (ex: `220g`).
* `dimensions_cm`: Dimensões da embalagem para cálculo de frete (`largura: 25cm`, `altura: 5cm`, `comprimento: 35cm`).

---

## ⚡ 3. Sequência de Eventos de Publicação Multicanal (1-Clique)

Ao clicar em **`⚡ SALVAR E PUBLICAR EM TODOS OS CANAIS`**:

1. **Gravação de Banco:** Registro no PostgreSQL Prisma local (`Product` e `ProductVariant`).
2. **Atualização da Vitrine:** Invalidação de cache do Next.js 15 (Tag Revalidation) e produto fica imediatamente visível na loja.
3. **Payload para Bling ERP API v3:** Envio via `POST https://www.bling.com.br/Api/v3/produtos` cadastrando a estrutura pai e variações de tamanho.
4. **Alimentação do Feed Meta Commerce:** Atualização automática do endpoint `/api/catalog/meta-feed.xml` consumido periodicamente pelo Instagram Shopping.

---

## 📌 Status de Implementação:
* **Especificação Técnica:** Documentada e Registrada em [docs/estrutura/FORMULARIO_CANONICO_UNIFICADO_MULTICANAL.md](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura/FORMULARIO_CANONICO_UNIFICADO_MULTICANAL.md).
* **Desenvolvimento de Código:** Aguardando comando de execução após a etapa de planejamento.

# ⚡ O Fluxo de Informação do STAR INK (APIs, Webhooks & Arquitetura GEO)

Esta camada define as integrações com fornecedores de Print on Demand, feed da Sacola do Instagram e as rotas exclusivas para indexação por motores de inteligência artificial (**GEO - Generative Engine Optimization**).

---

## 1. Mapeamento de Rotas & Endpoints

| Endpoint | Método | Função |
| :--- | :--- | :--- |
| `/api/catalog/meta` | `GET` | Feed XML RSS 2.0 (Instagram Shopping / Meta Catalog) |
| `/api/checkout` | `POST` | Processa pedido, reserva estoque e dispara ordem de produção PoD |
| `/api/webhooks/payment` | `POST` | Recebe confirmação de pagamento com validação HMAC SHA-256 |
| `/llms.txt` | `GET` | **Rota GEO:** Resumo em Markdown da ontologia e catálogo para crawlers de IA |
| `/api/admin/instagram/publish` | `POST` | Publica ou agenda drops no Instagram via Meta Graph API |

---

## 2. Arquitetura GEO (Generative Engine Optimization)

### 2.1. Injeção Dinâmica de JSON-LD em Server Components
Cada página de produto (`/produtos/[slug]`) injeta no `<head>` o seguinte código em tempo de renderização no servidor (SSR):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Camiseta Oversized STAR INK - Cyberpunk",
  "image": ["https://www.star-ink.com.br/imagens/01.jpg"],
  "description": "Camiseta oversized confeccionada em algodão 30.1 penteado 220g/m² com estampa digital DTG.",
  "brand": {
    "@type": "Brand",
    "name": "STAR INK"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "BRL",
    "price": "149.90",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

### 2.2. Arquivo `/llms.txt`
Padrão exposto no raiz para permitir que IAs de busca (ChatGPT, Perplexity, Gemini) recomendem produtos da loja com alta precisão e sem consumo excessivo de tokens.

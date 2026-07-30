# 🦴 O Esqueleto do STAR INK (Banco de Dados & Persistência PoD)

Esta camada define a estrutura física de dados no PostgreSQL (via Prisma ORM) com suporte nativo a múltiplos fornecedores de Print on Demand.

---

## 1. Modelagem Física de Tabelas SQL

```sql
-- 1. Configurações Dinâmicas (Design System & Tokens)
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Fornecedores PoD (Reserva INK, Dimona, Printful, etc.)
CREATE TABLE pod_suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL, -- ex: 'Reserva INK', 'Dimona', 'Printful'
    api_endpoint VARCHAR(255),
    api_key_encrypted TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. Tabela de Produtos
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    fabric_specifications JSONB, -- Ex: {"cotton": "100% Penteado", "weight": "220g"}
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    scheduled_at TIMESTAMP,      -- Data agendada para lançamento (Drop)
    ig_media_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Variantes de Estoque com Roteamento de Fornecedor PoD
CREATE TABLE stock_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    supplier_id UUID REFERENCES pod_suppliers(id) ON DELETE RESTRICT,
    supplier_sku VARCHAR(100),   -- SKU na fábrica externa
    size VARCHAR(50) NOT NULL,   -- 'P', 'M', 'G', 'GG', '3GG'
    color VARCHAR(100) NOT NULL,
    base_cost DECIMAL(10, 2),    -- Custo base cobrado pelo fornecedor
    CONSTRAINT unique_variant UNIQUE (product_id, size, color)
);
```

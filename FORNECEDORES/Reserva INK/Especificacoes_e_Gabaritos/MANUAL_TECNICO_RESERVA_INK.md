# 🖨️ Manual Técnico de Produção & Padrão de Artes — Reserva INK

> **Empresa:** STAR INK LTDA  
> **Parceiro de Impressão:** Reserva INK (AZZAS 2154 S.A - Campo Bom/RS)  
> **Tecnologia de Impressão:** DTG (*Direct-to-Garment*) Kornit / Brother  
> **Última Atualização:** Agosto de 2026  

---

## 📐 1. Parâmetros do Arquivo de Impressão (Print File)

| Parâmetro | Especificação Exigida |
| :--- | :--- |
| **Dimensão Recomendada** | **4200 px (largura) x 4800 px (altura)** |
| **Resolução de Imagem** | **300 DPI** (Pontos por Polegada) |
| **Formato de Arquivo** | **PNG 24/32 bits com Fundo Transparente** |
| **Espessura Mínima de Traço** | **1.5 px a 2.0 px** (Estética da Subtração / Hairline) |
| **Modo de Cor** | **sRGB / RGB de 8 bits por canal** |
| **Posicionamento no Peito** | **Centralizado, 5 cm a 7 cm abaixo da gola** |

---

## 🎨 2. Diretrizes Específicas de Design & DTG

1. **Vazado de Fundo em Tecidos Pretos (Soft-Hand):**
   - Para camisetas pretas, qualquer elemento preto no design deve ser tornado **totalmente transparente**.
   - Isso evita o acúmulo desnecessário de tinta branca de primer e tinta preta por cima, garantindo toque zero (*soft-hand*) e reduzindo a rigidez do tecido no peito do cliente.

2. **Inversão Autoral de Cores:**
   - **Camiseta Preta / Escura:** Usa arquivo de estampa com traços brancos (`#ffffff`).
   - **Camiseta Branca / Clara:** Usa arquivo de estampa com traços pretos (`#000000`).

3. **Margem de Segurança & Sangria:**
   - Deixar pelo menos 50px de margem transparente nas bordas da tela de 4200x4800px para evitar cortes acidentais durante a centralização automática da bandeja DTG.

---

## 📦 3. Padrão de Nomenclatura dos Arquivos de Arte (`FORNECEDORES/Reserva INK/Artes/`)

```
FORNECEDORES/Reserva INK/Artes/Drop_01/
├── ARTE_01_A_ESTRELA_reserva_preta_300dpi.png
├── ARTE_01_A_ESTRELA_reserva_branca_300dpi.png
├── ARTE_02_A_FADA_reserva_preta_300dpi.png
└── ARTE_02_A_FADA_reserva_branca_300dpi.png
```

---

## 🔗 4. Matriz de SKUs & Integração com Bling ERP

- **SKU Mestre (Pai):** `STINK-TSHIRT-[NOME_ARTE]` (ex: `STINK-TSHIRT-FADA-02`)
- **SKUs de Variação (Filhos):** `STINK-TSHIRT-[ARTE]-[COR]-[TAMANHO]`
  - Exemplo: `STINK-TSHIRT-FADA-PRETA-G`
- **Fluxo do Pedido:** E-commerce ➔ Bling ERP (NFe) ➔ API Reserva INK (Despacho D2C com embalagem neutra).

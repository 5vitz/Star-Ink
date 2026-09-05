# 🎨 Estrutura Mestre de Projetos de Arte, Matriz de SKUs & Ativos — STAR INK

> **Website Oficial:** `www.star-ink.com.br`  
> **Arquitetura de Ativos:** Asset Bundle por Projeto de Arte & Graduação Proporcional DTG  
> **Última Atualização:** Agosto de 2026  

---

## 🎯 1. Filosofia de Organização

Cada estampa do catálogo da **Star INK** é tratada como um **Projeto de Arte Autônomo** (Asset Bundle Mestre). 

Essa abordagem garante:
1. **Prova de Autoria & Respaldo Jurídico:** O JSON do Prompt Autoral fica armazenado junto ao arquivo PNG mestre em alta definição.
2. **Caimento Perfeito (Graduação por Tamanho):** Cada faixa de tamanho de roupa (P, M/G, GG/XG) recebe uma estampa proporcional em centímetros para evitar desproporção no peito do cliente.
3. **Inversão Autoral de Cores:** Separação estrita dos ativos para tecidos claros (traço escuro) e tecidos escuros (traço claro).
4. **Organização para Fornecedores PoD:** Otimização para Reserva INK, Dimona e confecções parceiras.

---

## 🧱 2. Hierarquia da Matriz de Produtos & SKUs (PostgreSQL & Storage)

```
🏢 NIVEL 1: COLLECTION (Ex: Drop 01 — Tarô Negro)
   │
   └── 🎨 NIVEL 2: ART PROJECT (Ex: Arte 02 — A Fada)
        │  ├── 📄 prompt_autoral.json (Prova de Autoria Jurídica + MetaPrompt)
        │  └── 🖼️ master_arte_vetorial.png (3508x4960px 300DPI)
        │
        └── 👕 NIVEL 3: PRODUCT CATEGORY (Ex: Camiseta / Moletom / Meia / Moda Praia)
             │
             ├── 🎨 NIVEL 4: COLOR VARIATION (Matriz de Contraste & Inversão)
             │    ├── 🖤 Tecido Preto   ➔ Estampa Traço Branco (Inversão Clara)
             │    ├── 🤍 Tecido Branco  ➔ Estampa Traço Preto (Inversão Escura)
             │    └── 💚 Tecido Verde   ➔ Estampa Contraste Adaptado
             │
             └── 📐 NIVEL 5: SIZE & PRINT ASSETS (Graduação de Impressão DTG)
                  ├── P   ➔ fada_preta_print_P_24cm.png
                  ├── M   ➔ fada_preta_print_M_28cm.png
                  ├── G   ➔ fada_preta_print_G_28cm.png
                  ├── GG  ➔ fada_preta_print_GG_32cm.png
                  └── XG  ➔ fada_preta_print_XG_32cm.png
```

---

## 🗂️ 3. Estrutura Física de Pastas por Projeto de Arte

```
public/catalog/drop-01/ARTE_02_A_FADA/
│
├── 📄 prompt_autoral.json        <-- Prova de Autoria & Sementes (Seeds)
│
├── 🖼️ MASTER/                    <-- Arte Mestre em 300 DPI (Pura Origem)
│
├── 🖨️ PRINT_FILES/              <-- Arquivos de Produção por Tamanho & Cor
│   ├── reserva_ink/              (Perfis de cor para Reserva INK)
│   └── dimona/                   (Perfis para Dimona/Outros)
│
├── 📸 SHOWCASE_CAROUSEL/        <-- As 6 Fotos Oficiais do Carrossel do Card
│   ├── 01_front_view.jpg        (Frente da peça no modelo/cabide)
│   ├── 02_back_view.jpg         (Costa da peça)
│   ├── 03_macro_detail.jpg      (Zoom HD no traço 1px)
│   ├── 04_ziplock_unboxing.jpg (Embalagem Ziplock fosca)
│   ├── 05_model_9x16.jpg        (Lookbook no corpo 9:16)
│   └── 06_size_chart.jpg        (Guia de tamanhos em cm)
│
└── 📦 DRAFTS_ARCHIVE/            <-- Histórico de Variações Geradas pela IA
    ├── draft_var_01.png
    ├── draft_var_02.png
    └── draft_var_03.png
```

# 🗺️ Mapa da Arquitetura — STAR INK (`www.star-ink.com.br`)

Este diretório centraliza todas as decisões arquiteturais, especificações conceituais e guias técnicos do e-commerce **STAR INK**, estruturados de forma modular em 5 camadas.

---

## 📂 Organização das 5 Camadas Modulares

* **🌸 [Alma](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura/Alma)**: Branding da STAR INK, tom de voz, design system estético (variáveis de cor, tipografia e regras visuais).
* **📐 [Corpo](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura/Corpo)**: Arquitetura de informação, UX/UI, vitrine minimalista 9:16, componentização autossuficiente e design do Painel de Controle Admin (`/admin`).
* **🦴 [Esqueleto](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura/Esqueleto)**: Engenharia e persistência de dados (modelagem de tabelas PostgreSQL/Prisma para Print on Demand e múltiplos fornecedores).
* **⚡ [FluxoInformacao](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura/FluxoInformacao)**: APIs de integração com fornecedores PoD (Reserva INK, Dimona, Printful), Instagram Shopping XML, Webhooks de checkout e **rotas de GEO (JSON-LD nativo e `/llms.txt`)**.
* **📋 [GuiaPrompts](file:///home/artz/Documentos/Antigravity/Star-Ink/docs/estrutura/GuiaPrompts)**: Fases de codificação e geração de prompts cirúrgicos prontos para a execução no Next.js com foco em GEO.

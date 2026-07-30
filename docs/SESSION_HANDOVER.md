# 📍 Protocolo de Passagem de Bastão (Handover) — STAR INK

> **Website Oficial:** `www.star-ink.com.br`  
> **Modelo de Negócio:** Print on Demand (PoD) & Dropshipping 2.0  
> **Filosofia de Trabalho:** Metodologia do Machado ("9 dias afiando o machado para no 10º dia cortar a árvore com facilidade").  
> **Última Atualização:** 30 de Julho de 2026

---

## 1. O que realizamos nesta sessão (Estado Atual)

* **Definição da Marca & Domínio ✅:**
  * Nome oficial definido: **STAR INK** (Domínio: `www.star-ink.com.br`).
  * Posicionamento: Marca unissex, contemporânea, de luxo acessível/contemporâneo voltada ao público exigente ("público iPhone").

* **Infraestrutura Cloud & Deploy Automático ✅:**
  * **Repositório GitHub:** Criado e sincronizado em [github.com/5vitz/Star-Ink](https://github.com/5vitz/Star-Ink.git).
  * **Zona DNS no Registro.br:** Entradas Tipo A (`star-ink.com.br` -> `31.220.102.2`) e CNAME (`www` -> `star-ink.com.br`) configuradas.
  * **VPS Contabo (`31.220.102.2`):** Banco de Dados PostgreSQL `star_ink_prod` (usuário `star_ink_user`) e bloco Nginx na porta `3001` totalmente provisionados.
  * **Script de Deploy:** Criado e testado em [scripts/deploy.sh](file:///home/artz/Documentos/Antigravity/Star-Ink/scripts/deploy.sh).
  * **Atalho de Área de Trabalho:** Ícone exclusivo **SI** criado e atalho [Deploy-Star-Ink.desktop](file:///home/artz/%C3%81rea%20de%20trabalho/Deploy-Star-Ink.desktop) validado no GNOME.

* **Arquitetura Voltada para GEO (Generative Engine Optimization) ✅:**
  * Planejado o suporte nativo a buscadores por IA (ChatGPT, Perplexity, Gemini).
  * Injeção de dados estruturados em **JSON-LD** (`Product`, `Organization`, `FAQPage`), renderização em servidor (SSR) no Next.js App Router e suporte ao padrão `/llms.txt`.

* **Governança da Mesa Redonda Mantida ✅:**
  * Diretor Criativo Humano: **Genera (Armando)**.
  * Orquestrador Geral / Maestro (IA): **Lincoln (Antigravity)**.

---

## 2. Estrutura do Projeto STAR INK

* **Diretório Mestre:** `/home/artz/Documentos/Antigravity/Star-Ink`
* **Documentação:** [/docs](file:///home/artz/Documentos/Antigravity/Star-Ink/docs)
  * `governanca/` — AGENTS.md e GEMINI.md
  * `estrutura/` — As 5 Camadas (Alma, Corpo, Esqueleto, FluxoInformacao, GuiaPrompts)
  * `agentes/` — Biblioteca de Agentes Especialistas de Coprodução
  * `TASKS/` & `DONE/` — Controle de Backlog
* **Automação:** [scripts/deploy.sh](file:///home/artz/Documentos/Antigravity/Star-Ink/scripts/deploy.sh)

---

## 3. Próximos Passos Imediatos (Para a próxima sessão)

1. **Benchmark Visual Internacional:** Apresentar a curadoria de e-commerces de luxo contemporâneo/minimalistas para orientar a pesquisa do Genera.
2. **Ativação SSL (HTTPS):** Rodar a emissão do certificado via Certbot na VPS Contabo (`certbot --nginx -d star-ink.com.br -d www.star-ink.com.br`) assim que a propagação do Registro.br zerar.
3. **Detalhamento da Camada Corpo (UX/UI):** Revisar conjuntamente com o Genera o arquivo da Camada Corpo para detalhar os requisitos de telas do site.
4. **Especificação do Painel Admin (`/admin`):** Desenhar a TASK-001 (gerenciamento PoD e agendamento Instagram).

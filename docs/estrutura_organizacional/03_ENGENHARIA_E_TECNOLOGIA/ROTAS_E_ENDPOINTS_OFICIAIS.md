# 🗺️ Guia de Rotas, Endpoints & Links Oficiais — STAR INK

> **Website Oficial:** `https://www.star-ink.com.br`  
> **Gerenciador:** Maestro Lincoln & Diretor Criativo Genera  
> **Última Atualização:** 5 de Agosto de 2026  

---

## 🌐 1. Rotas Públicas da Loja (E-Commerce D2C)

| Finalidade | URL Oficial | Descrição |
| :--- | :--- | :--- |
| **Página Inicial / Vitrine** | `https://www.star-ink.com.br/` | Vitrine autoral do Drop 01 com estética da subtração. |
| **Modo Manutenção / VIP Gate** | `https://www.star-ink.com.br/manutencao` | Tela de acesso restrito com login híbrido (Nativo + Google). |
| **Atendimento de Trocas** | `https://www.star-ink.com.br/trocas` | Central de logística reversa e solicitação de trocas. |
| **Painel Administrativo** | `https://www.star-ink.com.br/admin` | Cockpit executivo dos 4 módulos de gestão da startup. |
| **Módulo Financeiro / Bling** | `https://www.star-ink.com.br/admin/financeiro` | DRE, Unit Economics e controle de notas fiscais Bling. |

---

## 🔗 2. Feeds & Integradores Multicanal

| Integrador | Endpoint / URL | Descrição |
| :--- | :--- | :--- |
| **Meta Commerce (Instagram / FB)** | `https://www.star-ink.com.br/api/catalog/meta-feed` | Feed XML automático para a Sacolinha do Instagram Shopping. |
| **Autorizar OAuth Bling ERP** | `https://www.star-ink.com.br/api/auth/bling/authorize` | Rota para autenticação de 1-Clique com a API v3 do Bling. |
| **Callback OAuth Bling ERP** | `https://www.star-ink.com.br/api/auth/bling/callback` | Callback de recebimento e persistência de tokens Bling. |
| **GEO AI Index Feed** | `https://www.star-ink.com.br/llms.txt` | Indexador para Motores de Busca por IA (Perplexity/Gemini). |

---

## ⚡ 3. Endpoints da API REST de Produção & Concierge

| Serviço | Endpoint API | Método | Descrição |
| :--- | :--- | :---: | :--- |
| **Concierge Chat (WhatsApp/AI)** | `/api/concierge/chat` | `POST` | Processa mensagens do cliente via IA Concierge 24h. |
| **Calculadora DRE & Margin** | `/api/financials/dre` | `POST` | Simula a margem real por peça (Unit Economics). |
| **Emissão de NFe Bling** | `/api/financials/bling` | `POST` | Transmite o pedido e aciona NFe no Bling ERP. |
| **Fila de Pedidos PoD** | `/api/production/orders` | `GET/POST` | Gerencia o status dos pedidos nas fábricas PoD. |

---

## 📱 4. Canais & Redes Sociais da Marca

| Canal | Link / Identificador |
| :--- | :--- |
| **Instagram Oficial** | `https://www.instagram.com/starink.oficial/` (`@starink.oficial`) |
| **Página do Facebook** | `https://www.facebook.com/profile.php?id=61592620912452` (`STAR INK`) |
| **E-mail Oficial** | `starink.oficial@gmail.com` |

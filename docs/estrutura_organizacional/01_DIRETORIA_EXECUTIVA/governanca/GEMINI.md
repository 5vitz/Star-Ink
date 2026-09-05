# GEMINI.md — STAR INK (`www.star-ink.com.br`)

Diretrizes comportamentais e regras de governança para o desenvolvimento do ecossistema STAR INK.

---

## 🪓 A Metodologia do Machado (Por que "Lincoln"?)

> *"Se eu tivesse 10 dias para derrubar uma árvore gigante, passaria 9 dias afiando o machado para cortá-la com facilidade no décimo dia."*

No **STAR INK**, nós priorizamos o planejamento cirúrgico e o diálogo estratégico. Dedicar tempo desenhando a arquitetura, refinando o GEO (Generative Engine Optimization) e alinhando os conceitos é o que nos permite codificar soluções robustas, criativas e limpas.

---

## 🧠 1. Pense Antes de Codificar (Think Before Coding)
- Declare suas suposições de forma explícita.
- Se existirem múltiplas formas de implementar uma alteração, apresente os tradeoffs no chat.
- Evite excesso de engenharia e especulação.

---

## ⚡ 2. Simplicity First & GEO (Generative Engine Optimization)
- Escreva o menor código possível que resolva o problema.
- **GEO First:** Priorize dados estruturados em JSON-LD (`Product`, `Organization`, `FAQPage`), conteúdo semântico em blocos com alta densidade de fatos e rotas expostas em `/llms.txt`.
- **Imagens Adaptativas:** Usar sempre o componente `<Image />` nativo do Next.js.

---

## 🪡 3. Mudanças Cirúrgicas (Surgical Changes)
- Altere apenas o necessário em arquivos existentes.
- Respeite as convenções de código locais.

---

## 🔒 4. Restrições Estritas
- **PROIBIDO O USO DE GREP:** Usar caminhos diretos de arquivos ou listagens cirúrgicas.
- **DEPLOY EXCLUSIVO DO GENERA:** Não executar `git push` ou scripts de deploy para servidores.
- **ESTÉTICA DA SUBTRAÇÃO:** Linhas finas de borda (1px), fontes leves e paleta de cores tailoring.
- **NOMENCLATURA PADRÃO DA MARCA:** A escrita oficial e padronizada da empresa é estritamente **Star INK**.

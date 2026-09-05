# 🎨 07. Departamento de Atelier de Artes & Prompts

> **Agentes de IA Alocados:** ASK Nexus, PLAN Narrative & Artwork Architect  
> **Objetivo:** Desenvolvimento contínuo das obras de arte autorais dos Drops da Star-Ink, aplicando o método de *Structured Prompt Engineering* e o filtro rigoroso da *Estética da Subtração*.  

---

## 🏛️ Atribuições & Escopo

1. **Concepção Visual & DNA Gráfico:** Análise de referências e extração do DNA visual (traço mínimo 1px hairline, geometria, contraste `#ffffff` em fundo `#000000`).
2. **Filtro da Estética da Subtração:** Refinamento dos conceitos poéticos e visuais para remover qualquer excesso ornamental.
3. **Compilação Técnica JSON Schema A3:** Parametrização matemática das artes para o formato físico A3 (300 DPI / 4200x4800px PNG transparente) pronto para impressão DTG HD.
4. **Guarda de Autoria & Proof of Concept:** Registro do JSON Prompt para prova jurídica de autoria autoral.

---

## 🛡️ Mecanismos Anti-Omissão (Prevenção de Falhas)

| Risco de Omissão | Mecanismo Preventivo Automatizado | Ação de Emergência |
| :--- | :--- | :--- |
| **Arte com Erro de DPI ou Formato Incorreto** | O Artwork Architect valida a exportação do arquivo em 300 DPI, canal alfa transparente e resolução mínima de 4200x4800px. | Re-renderização automática da matriz A3 antes da gravação no repositório. |
| **Extrapolação dos Limites da Estampa DTG** | Validação das margens de ancoragem percentual (`x_percent`, `y_percent`) para evitar cortes de estampa no peito da camiseta. | Ajuste das coordenadas no JSON Schema. |
| **Perda do Prompt Original de Geração** | Todo arquivo PNG aprovado é obrigatoriamente acompanhado pelo seu arquivo `prompt_schema_*.json` no mesmo diretório. | Reconstrução do JSON a partir do log do Atelier. |

---

## 🤖 Agentes de IA Alocados

* 🎨 **ASK Nexus:** Leitor de Alma Visual e extração de DNA gráfico. Analisa imagens e conceitos visuais, traduzindo estética em parâmetros.
* 📐 **PLAN Narrative:** Arquiteto de narrativa e filtro da Estética da Subtração. Aplica o princípio de que *"a arte está pronta quando não se pode retirar mais nada"*.
* 🛠️ **Artwork Architect:** Compilador técnico encarregado de gerar os arquivos JSON Schema A3 e exportar as matrizes de impressão de altíssima definição (300 DPI PNG).

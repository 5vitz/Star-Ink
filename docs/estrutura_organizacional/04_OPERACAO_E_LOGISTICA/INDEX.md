# 📦 04. Departamento de Operações, Logística PoD & Estoque

> **Agentes de IA Alocados:** PoD Dispatch Agent & Logistics Tracker (Melhor Envio Agent)  
> **Objetivo:** Garantir a execução perfeita da cadeia de suprimentos sob demanda (*Print on Demand 2.0*), o roteamento correto de arquivos de impressão 300 DPI para os parceiros (Reserva INK, Dimona, etc.) e o rastreamento em tempo real dos pedidos.  

---

## 🏛️ Atribuições & Escopo

1. **Roteamento Sob Demanda (PoD Multi-Supplier):** Envio dos arquivos de estampa no padrão técnico (4200x4800px @ 300 DPI PNG transparente) para a fábrica parceira correspondente.
2. **Controle de SLA de Produção:** Acompanhamento do tempo de fabricação (prazo médio de 48h a 72h úteis para impressão DTG).
3. **Gestão Logística de Fretes:** Conexão com o Melhor Envio para geração de etiquetas e monitoramento de rastreamento (Correios / Jadlog).
4. **Unboxing & Suprimentos de Embalagem:** Controle de insumos institucionais (Saco Ziplock Frosted, Tags, Cartões Manifesto A6 e Adesivos Vinílicos).

---

## 🛡️ Mecanismos Anti-Omissão (Prevenção de Falhas)

| Risco de Omissão | Mecanismo Preventivo Automatizado | Ação de Emergência |
| :--- | :--- | :--- |
| **Pedido Preso no Fornecedor (> 48h)** | Alerta automatizado disparado se um pedido aprovado permanecer sem atualização de status na fábrica por mais de 48h úteis. | Notificação direta ao suporte VIP da fábrica parceira para priorização da fila. |
| **Envio de Arquivo em Baixa Resolução** | O sistema valida a resolução da estampa (deve ter 300 DPI e dimensão exata) antes de disparar o pedido para o fornecedor. | Bloqueio de despacho e notificação ao Atelier de Artes para substituição do arquivo. |
| **Código de Rastreio Não Enviado ao Cliente** | Webhook do Melhor Envio dispara automaticamente o rastreamento via WhatsApp/E-mail assim que o pacote é postado na transportadora. | Reenvio manual em 1-clique pelo painel admin. |

---

## 🤖 Agentes de IA Alocados

* 📦 **PoD Dispatch Agent:** Responsável por checar novos pedidos no Bling ERP, formatar os arquivos de estampa de acordo com o gabarito técnico da fábrica selecionada (Reserva INK, Dimona, Hotprinti) e disparar a ordem de produção.
* 🚚 **Logistics Tracker (Melhor Envio Agent):** Robô de rastreamento que consome as APIs de frete, atualiza o status de entrega na conta do cliente e avisa em caso de imprevistos na entrega (ex: endereço não localizado).

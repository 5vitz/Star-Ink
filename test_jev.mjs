// Teste de Conexão Star-Ink ➔ TypeSafe JEV API
async function testJev() {
  const apiKey = process.env.JEV_API_KEY;

  if (!apiKey) {
    console.error("❌ ERRO: JEV_API_KEY não encontrada no process.env!");
    process.exit(1);
  }

  console.log("🔑 Chave detectada com prefixo:", apiKey.slice(0, 10) + "...");
  console.log("🚀 Enviando requisição para https://api.typesafe.ai/v1/systemone ...");

  const payload = {
    model: "jev-latest",
    state: "Recebi minha camiseta Star-Ink de algodão puro e achei a estampa incrível!",
    questions: {
      is_positive_feedback: {
        type: "noul",
        instructions: "Is this customer feedback positive and complimentary?"
      },
      department_routing: {
        type: "choice",
        criteria: {
          sac_elogios: "Customer complimenting the brand or product",
          trocas_defeitos: "Customer asking for product exchange or reporting a defect",
          financeiro: "Billing, refund or payment issue"
        }
      }
    }
  };

  try {
    const startTime = Date.now();
    const response = await fetch("https://api.typesafe.ai/v1/systemone", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const elapsed = Date.now() - startTime;
    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ Erro HTTP ${response.status}:`, JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log(`\n🎉 SUCESSO! Resposta recebida em ${elapsed}ms:`);
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Erro ao conectar com o Jev:", error.message);
  }
}

testJev();

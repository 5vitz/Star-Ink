import os
import subprocess

html_content = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Relatório de Performance & Auditoria Estratégica - Elo Bike & Trips</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: #cbd5e1;
    color: #0f172a;
    font-size: 11pt;
    line-height: 1.5;
  }

  .page {
    width: 210mm;
    height: 297mm;
    margin: 0 auto;
    padding: 16mm 16mm 18mm 16mm;
    background: #ffffff;
    position: relative;
    page-break-after: always;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .page:last-of-type {
    page-break-after: auto !important;
  }

  /* Header & Footer */
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
  .header-brand {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800;
    font-size: 13pt;
    color: #064e3b;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .header-tag {
    font-size: 8.5pt;
    font-weight: 600;
    color: #0d9488;
    background: #ccfbf1;
    padding: 3px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .header-meta {
    font-size: 8.5pt;
    color: #64748b;
    font-weight: 500;
  }

  .footer-bar {
    position: absolute;
    bottom: 12mm;
    left: 16mm;
    right: 16mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e2e8f0;
    padding-top: 8px;
    font-size: 8pt;
    color: #94a3b8;
  }

  /* Typography helpers */
  h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22pt; font-weight: 800; color: #064e3b; margin: 0 0 6px 0; line-height: 1.2; }
  h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14pt; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; }
  h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11pt; font-weight: 700; color: #0f172a; margin: 0 0 6px 0; }

  .badge-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #0d9488;
    color: white;
    border-radius: 6px;
    font-size: 11pt;
  }

  /* Grid Layouts */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; }

  /* Cards */
  .card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px 14px;
  }
  .card-teal { background: #f0fdf4; border-color: #bbf7d0; }
  .card-coral { background: #fff1f2; border-color: #fecdd3; }
  .card-amber { background: #fffbeb; border-color: #fde68a; }

  /* Metric Card */
  .metric-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 12px 14px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .metric-label { font-size: 8.5pt; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
  .metric-value { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18pt; font-weight: 800; color: #0f172a; margin: 4px 0 2px 0; }
  .metric-sub { font-size: 8pt; font-weight: 600; }
  .sub-up { color: #059669; }
  .sub-down { color: #e11d48; }

  /* Tables */
  table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 9pt; }
  th { background: #0f172a; color: white; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; text-align: left; padding: 8px 10px; font-size: 8.5pt; }
  th:first-child { border-top-left-radius: 6px; }
  th:last-child { border-top-right-radius: 6px; }
  td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; color: #334155; vertical-align: top; }
  tr:nth-child(even) td { background: #f8fafc; }

  /* Highlight box */
  .callout {
    border-left: 4px solid #0d9488;
    background: #f0fdfa;
    padding: 10px 14px;
    border-radius: 0 8px 8px 0;
    margin: 10px 0;
    font-size: 9.5pt;
  }
  .callout-alert {
    border-left-color: #e11d48;
    background: #fff1f2;
  }
  .callout-warning {
    border-left-color: #f59e0b;
    background: #fffbeb;
  }

  /* List Styling */
  ul, ol { margin: 4px 0; padding-left: 18px; }
  li { margin-bottom: 4px; font-size: 9pt; color: #334155; }

  .chart-container {
    position: relative;
    width: 100%;
    height: 180px;
  }

  .cover-hero {
    background: linear-gradient(135deg, #064e3b 0%, #047857 50%, #0d9488 100%);
    color: white;
    border-radius: 14px;
    padding: 24px 28px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(6, 78, 59, 0.15);
  }
  .cover-hero h1 { color: #ffffff; font-size: 24pt; margin-bottom: 8px; }
  .cover-hero p { color: #a7f3d0; font-size: 11pt; margin: 0; font-weight: 500; }
  .cover-pills { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; }
  .cover-pill { background: rgba(255,255,255,0.15); backdrop-filter: blur(4px); padding: 5px 12px; border-radius: 20px; font-size: 8.5pt; font-weight: 600; color: #ffffff; }

</style>
</head>
<body>

<!-- PAGE 1: CAPA & VISÃO GERAL -->
<div class="page">
  <div class="header-bar">
    <div class="header-brand">🌴 Elo Bike & Trips</div>
    <div class="header-tag">Relatório Executivo</div>
    <div class="header-meta">Período: Maio - Julho / 2026</div>
  </div>

  <div class="cover-hero">
    <h1>Relatório de Performance & Auditoria Estratégica</h1>
    <p>Análise Diagnóstica, Raio-X de Público, Engenharia Reversa e Plano de Ação de 90 Dias</p>
    <div class="cover-pills">
      <span class="cover-pill">📍 Sul da Bahia</span>
      <span class="cover-pill">🚴‍♀️ Cicloturismo & Wellness</span>
      <span class="cover-pill">⚡ Frotas E-bike</span>
      <span class="cover-pill">📊 Meta Insights & Funil</span>
    </div>
  </div>

  <h2><span class="badge-icon">📊</span> Painel Geral de Métricas (O Trimestre em Números)</h2>
  <div class="grid-4" style="margin-bottom: 14px;">
    <div class="metric-card">
      <div class="metric-label">Visualizações Perfil</div>
      <div class="metric-value">213.8k</div>
      <div class="metric-sub sub-up">▲ +25,4% vs anterior</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Alcance Único</div>
      <div class="metric-value">53.7k</div>
      <div class="metric-sub sub-up">▲ +9,5% contas</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Interações Feed</div>
      <div class="metric-value">7.2k</div>
      <div class="metric-sub sub-up">▲ Curtidas/Comentários</div>
    </div>
    <div class="metric-card" style="border-color: #fecdd3; background: #fff1f2;">
      <div class="metric-label" style="color: #be123c;">Views Stories</div>
      <div class="metric-value" style="color: #e11d48;">11.5k</div>
      <div class="metric-sub sub-down">▼ -54,5% (Gargalo 🚨)</div>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom: 14px;">
    <div class="card card-teal">
      <h3 style="color: #064e3b;">🎯 Principais Fortalezas da Marca</h3>
      <ul>
        <li><strong>Excelente Atração de Topo de Funil:</strong> Anúncios pagos trazem 136,5k visualizações de não-seguidores qualificados.</li>
        <li><strong>Forte Conexão Emocional nos Carrosséis:</strong> Posts de identificação humana e viagem solo registram altos índices de salvamentos e comentários.</li>
        <li><strong>Reputação Impecável:</strong> Nota Máxima 5.0 no TripAdvisor e público altamente satisfeito com a experiência presencial na Bahia.</li>
      </ul>
    </div>
    <div class="card card-coral">
      <h3 style="color: #9f1239;">🚨 Gargalos Críticos Identificados</h3>
      <ul>
        <li><strong>A Crise dos Stories (-54,5%):</strong> Média de apenas 40-60 views/dia por excesso de panfletos institucionais sem rostos.</li>
        <li><strong>Vazamento no Link da Bio:</strong> 3.400 cliques no perfil resultam em apenas 263 conversas no DM (92% de perda no funil).</li>
        <li><strong>Dependência Excessiva de Mídia Paga:</strong> 62,7% das conversas vêm de anúncios. Se o tráfego para, o comercial paralisa.</li>
      </ul>
    </div>
  </div>

  <div class="callout">
    <strong>💡 Diagnóstico Geral:</strong> A marca Elo Bike & Trips possui excelente apelo visual e tração paga. No entanto, o funil comercial apresenta fricção técnica na Bio e abandono da audiência diária nos Stories. A reestruturação de perfil e a humanização dos conteúdos permitirão converter o tráfego atual em faturamento real.
  </div>

  <div class="footer-bar">
    <span>Elo Bike & Trips — Gestão Estratégica de Mídias Sociais</span>
    <span>Página 1 de 9</span>
  </div>
</div>

<!-- PAGE 2: PERSONA & COMPORTAMENTO -->
<div class="page">
  <div class="header-bar">
    <div class="header-brand">🌴 Elo Bike & Trips</div>
    <div class="header-tag">Raio-X de Audiência</div>
    <div class="header-meta">Período: Maio - Julho / 2026</div>
  </div>

  <h2><span class="badge-icon">👥</span> O Perfil da Persona Real (A Tribo da Elo)</h2>
  
  <div class="grid-2" style="margin-bottom: 14px;">
    <div class="card">
      <h3>Distribuição por Gênero</h3>
      <div class="chart-container" style="height: 160px;">
        <canvas id="genderChart"></canvas>
      </div>
      <p style="font-size: 8.5pt; color: #475569; text-align: center; margin-top: 4px;">
        <strong>61,9% Feminino</strong> vs 38,1% Masculino. Foco central na mulher.
      </p>
    </div>

    <div class="card">
      <h3>Faixa Etária Dominante</h3>
      <div class="chart-container" style="height: 160px;">
        <canvas id="ageChart"></canvas>
      </div>
      <p style="font-size: 8.5pt; color: #475569; text-align: center; margin-top: 4px;">
        Concentração absoluta entre <strong>45 e 64 anos</strong>. Público jovem (&lt;34) é irrelevante.
      </p>
    </div>
  </div>

  <div class="grid-2" style="margin-bottom: 14px;">
    <div class="card card-teal">
      <h3 style="color: #064e3b;">📍 Origem Geográfica do Público</h3>
      <p style="font-size: 9pt; margin-bottom: 6px;"><strong>31,7% concentrado no eixo SP/RJ:</strong></p>
      <ul>
        <li><strong>São Paulo (Capital/Interior):</strong> 19,2% da base total</li>
        <li><strong>Rio de Janeiro (Capital/Niterói):</strong> 12,5% da base total</li>
      </ul>
      <p style="font-size: 8.5pt; color: #047857; margin-top: 6px;">
        <em>💡 Insight: O cliente ideal é uma mulher madura de grande capital do Sudeste que busca bem-estar, segurança e natureza no Sul da Bahia.</em>
      </p>
    </div>

    <div class="card card-amber">
      <h3 style="color: #92400e;">🧠 Driver Emocional & Barreira de Compra</h3>
      <ul>
        <li><strong>O Desejo:</strong> Desconexão urbana, paisagens paradisíacas, acolhimento e ritmo sem pressa.</li>
        <li><strong>A Maior Objeção:</strong> Medo do desgaste físico ("Não aguento o pedal", "Não sou atleta").</li>
        <li><strong>A Solução Elo:</strong> E-bikes (pedal assistido) + Carro de Apoio + Gastronomia local.</li>
      </ul>
    </div>
  </div>

  <h2><span class="badge-icon">⏰</span> Hábitos e Horários de Maior Engajamento (Horário de Brasília)</h2>
  <div class="card">
    <div class="grid-3">
      <div style="text-align: center; padding: 6px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="font-size: 10pt; font-weight: 700; color: #0d9488;">📅 Terças-Feiras</div>
        <div style="font-size: 14pt; font-weight: 800; color: #0f172a;">07:30 AM</div>
        <div style="font-size: 8pt; color: #64748b;">Consumo matinal (Café da manhã)</div>
      </div>
      <div style="text-align: center; padding: 6px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="font-size: 10pt; font-weight: 700; color: #0d9488;">📅 Quintas-Feiras</div>
        <div style="font-size: 14pt; font-weight: 800; color: #0f172a;">12:54 PM</div>
        <div style="font-size: 8pt; color: #64748b;">Pausa do Almoço / Rotina</div>
      </div>
      <div style="text-align: center; padding: 6px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="font-size: 10pt; font-weight: 700; color: #0d9488;">📅 Sábados</div>
        <div style="font-size: 14pt; font-weight: 800; color: #0f172a;">09:07 AM</div>
        <div style="font-size: 8pt; color: #64748b;">Manhã de fim de semana</div>
      </div>
    </div>
    <p style="font-size: 8.5pt; color: #475569; margin-top: 8px; margin-bottom: 0;">
      <strong>Didática dos Dados (Ajuste Fuso BRT):</strong> O Meta Insights reporta dados no Horário do Pacífico (PST). Convertendo para Brasília (+4h), os picos reais de leitura da persona (45-64 anos) ocorrem às <strong>07:30 da manhã</strong> nas terças, no <strong>almoço (12:54)</strong> nas quintas e às <strong>09:07 da manhã</strong> aos sábados.
    </p>
  </div>

  <div class="footer-bar">
    <span>Elo Bike & Trips — Gestão Estratégica de Mídias Sociais</span>
    <span>Página 2 de 9</span>
  </div>
</div>

<!-- PAGE 3: ORIGEM DO TRÁFEGO -->
<div class="page">
  <div class="header-bar">
    <div class="header-brand">🌴 Elo Bike & Trips</div>
    <div class="header-tag">Análise de Tráfego</div>
    <div class="header-meta">Período: Maio - Julho / 2026</div>
  </div>

  <h2><span class="badge-icon">📈</span> Dependência de Mídia Paga vs. Desconexão de Base</h2>
  
  <div class="grid-2" style="margin-bottom: 14px;">
    <div class="card">
      <h3>Origem das Visualizações (209.000 Views)</h3>
      <div class="chart-container" style="height: 170px;">
        <canvas id="viewsSourceChart"></canvas>
      </div>
    </div>

    <div class="card">
      <h3>Origem das Mensagens DMs (263 Conversas)</h3>
      <div class="chart-container" style="height: 170px;">
        <canvas id="dmsSourceChart"></canvas>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <strong>⚠️ Alerta de Risco Comercial:</strong> O tráfego pago representa 65,5% do tráfego total e é responsável por 62,7% de todos os leads comerciais (165 DMs). O canal orgânico gera apenas 98 conversas. Se os anúncios forem interrompidos, a captação de clientes cai drasticamente.
  </div>

  <h2><span class="badge-icon">🔬</span> Análise Comparativa dos Canais</h2>
  <table>
    <thead>
      <tr>
        <th>Canal de Origem</th>
        <th>Visualizações</th>
        <th>DMs Gerados</th>
        <th>Papel no Funil</th>
        <th>Diagnóstico Tático</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Tráfego Pago (Anúncios)</strong></td>
        <td>136.580 (65,5%)</td>
        <td>165 (62,7%)</td>
        <td>Atração de Topo de Funil</td>
        <td>Excelente motor de tração. Traz pessoas novas das capitais para a marca.</td>
      </tr>
      <tr>
        <td><strong>Tráfego Orgânico (Seguidores)</strong></td>
        <td>71.659 (34,5%)</td>
        <td>98 (37,3%)</td>
        <td>Comunidade e Retenção</td>
        <td>Comunidade engajada nos carrosséis, porém subaproveitada por falta de Stories.</td>
      </tr>
    </tbody>
  </table>

  <div class="card card-teal" style="margin-top: 14px;">
    <h3 style="color: #064e3b;">💡 Solução Estratégica: O Funil Integrado</h3>
    <p style="font-size: 9pt; margin: 0;">
      Para reduzir a dependência financeira de anúncios sem perder vendas, devemos utilizar os anúncios para <strong>atrair</strong> o visitante e o conteúdo orgânico (Stories diários + CTA nos comentários do Feed) para <strong>converter e reter</strong> esse visitante gratuitamente.
    </p>
  </div>

  <div class="footer-bar">
    <span>Elo Bike & Trips — Gestão Estratégica de Mídias Sociais</span>
    <span>Página 3 de 9</span>
  </div>
</div>

<!-- PAGE 4: ANÁLISE DE CONTEÚDO & STORIES -->
<div class="page">
  <div class="header-bar">
    <div class="header-brand">🌴 Elo Bike & Trips</div>
    <div class="header-tag">Auditoria de Conteúdo</div>
    <div class="header-meta">Período: Maio - Julho / 2026</div>
  </div>

  <h2><span class="badge-icon">🏆</span> Engenharia Reversa do Feed: O Que Funciona</h2>
  <div class="card card-teal" style="margin-bottom: 12px;">
    <p style="font-size: 9pt; margin: 0;">
      A análise dos dados comprovou que a persona da Elo responde intensamente a <strong>conteúdos de identificação humana, superação leve e narrativa emocional</strong>.
    </p>
  </div>

  <div class="grid-3" style="margin-bottom: 14px;">
    <div class="metric-card">
      <div style="font-size: 8pt; font-weight: 700; color: #0d9488; text-transform: uppercase;">Top Post #1 — Lael Wilcox</div>
      <div style="font-size: 11pt; font-weight: 800; color: #0f172a; margin: 4px 0;">4.389 Views</div>
      <div style="font-size: 8pt; color: #64748b;">256 Curtidas | 46 Compartilhamentos</div>
      <p style="font-size: 8pt; color: #475569; margin-top: 4px;">Carrossel sobre força feminina e cicloturismo inspiracional.</p>
    </div>
    <div class="metric-card">
      <div style="font-size: 8pt; font-weight: 700; color: #0d9488; text-transform: uppercase;">Top Post #2 — 10 Coisas de Ciclista</div>
      <div style="font-size: 11pt; font-weight: 800; color: #0f172a; margin: 4px 0;">3.267 Views</div>
      <div style="font-size: 8pt; color: #64748b;">184 Curtidas | 16 Compartilhamentos</div>
      <p style="font-size: 8pt; color: #475569; margin-top: 4px;">Humor de nicho e pertencimento ("Tribo do Pedal").</p>
    </div>
    <div class="metric-card">
      <div style="font-size: 8pt; font-weight: 700; color: #0d9488; text-transform: uppercase;">Top Post #3 — Viagem Solo</div>
      <div style="font-size: 11pt; font-weight: 800; color: #0f172a; margin: 4px 0;">2.799 Views</div>
      <div style="font-size: 8pt; color: #64748b;">1.301 Alcance | 34 Comentários (Recorde)</div>
      <p style="font-size: 8pt; color: #475569; margin-top: 4px;">"Muita gente adia uma viagem por falta de companhia..."</p>
    </div>
  </div>

  <h2><span class="badge-icon" style="background: #e11d48;">🚨</span> Gargalo 1: A Crise dos Stories (-54,5% Audiência)</h2>
  <div class="grid-2" style="margin-bottom: 12px;">
    <div class="card card-coral">
      <h3 style="color: #9f1239;">❌ O Erro Técnico Identificado</h3>
      <p style="font-size: 8.5pt; color: #881337; margin-bottom: 6px;">
        Sequências longas de fotos estáticas institucionais, panfletos ou encartes sem rostos derrubaram a audiência para apenas <strong>40 a 60 views/dia</strong>.
      </p>
      <div class="chart-container" style="height: 130px;">
        <canvas id="storiesChart"></canvas>
      </div>
    </div>

    <div class="card card-teal">
      <h3 style="color: #064e3b;">✅ A Exceção Comercial (O Que Funcionou)</h3>
      <p style="font-size: 8.5pt; color: #047857; margin-bottom: 6px;">
        Os únicos Stories que atingiram picos de audiência no trimestre foram os <strong>humanizados e em tempo real</strong>:
      </p>
      <ul>
        <li><strong>Juliano de E-bike com a filha:</strong> 273 views (Pico #1)</li>
        <li><strong>"O Guia tá On" (Bastidores):</strong> 239 views (Pico #2)</li>
        <li><strong>Cachoeira da Onça ao vivo:</strong> 206 views (Pico #3)</li>
      </ul>
      <p style="font-size: 8pt; color: #065f46; margin-top: 4px;">
        <em>Lição Didática: O público quer consumir PESSOAS e bastidores reais da Bahia, não encartes de propaganda.</em>
      </p>
    </div>
  </div>

  <div class="footer-bar">
    <span>Elo Bike & Trips — Gestão Estratégica de Mídias Sociais</span>
    <span>Página 4 de 9</span>
  </div>
</div>

<!-- PAGE 5: AUDITORIA DO FUNIL DA BIO -->
<div class="page">
  <div class="header-bar">
    <div class="header-brand">🌴 Elo Bike & Trips</div>
    <div class="header-tag">Auditoria de Conversão</div>
    <div class="header-meta">Período: Maio - Julho / 2026</div>
  </div>

  <h2><span class="badge-icon" style="background: #e11d48;">🚨</span> Gargalo 2: O Labirinto Ergônomico da Bio</h2>
  
  <div class="callout callout-alert" style="margin-bottom: 12px;">
    <strong> O Ponto de Fuga Comercial (O Mistério dos 3.400 Cliques):</strong><br>
    O perfil registrou <strong>3.400 cliques no link da Bio</strong> no trimestre, porém apenas <strong>263 conversas no WhatsApp foram iniciadas</strong>. Existe uma perda massiva de <strong>92,3% dos potenciais clientes</strong> devido à fricção técnica na entrada do perfil!
  </div>

  <div class="grid-3" style="margin-bottom: 14px;">
    <div class="card card-coral">
      <h3 style="color: #9f1239;">Fase 1: O Pop-up Duplo</h3>
      <p style="font-size: 8.5pt;">Ao clicar na Bio do Instagram, abre-se um pop-up com 2 links concorrentes (site vs Linktree).</p>
      <span style="font-size: 8pt; font-weight: 700; color: #e11d48;">Paralisia de decisão no público 45+</span>
    </div>

    <div class="card card-amber">
      <h3 style="color: #92400e;">Fase 2: Poluição no Linktree</h3>
      <p style="font-size: 8.5pt;">O Linktree exibe 7 botões de catálogos frios + 6 links de dispersão no rodapé (YouTube, Spotify).</p>
      <span style="font-size: 8pt; font-weight: 700; color: #d97706;">Dispersão do cliente para mídias externas</span>
    </div>

    <div class="card card-coral">
      <h3 style="color: #9f1239;">Fase 3: Canal Oculto</h3>
      <p style="font-size: 8.5pt;">O botão "Fale Conosco" (WhatsApp) ficou escondido na última posição fora da primeira rolagem.</p>
      <span style="font-size: 8pt; font-weight: 700; color: #e11d48;">Pagamos anúncios para enviar o cliente pro Spotify</span>
    </div>
  </div>

  <h2><span class="badge-icon">🔀</span> Mapeamento do Desperdício no Funil de Vendas</h2>
  
  <div class="card" style="padding: 16px; background: #f8fafc;">
    <div style="display: flex; justify-content: space-between; align-items: center; text-align: center;">
      <div style="flex: 1; padding: 8px; background: white; border-radius: 8px; border: 1px solid #cbd5e1;">
        <div style="font-size: 8pt; color: #64748b;">1. TRÁFEGO PAGO</div>
        <div style="font-size: 13pt; font-weight: 800; color: #0f172a;">136.580 Views</div>
        <div style="font-size: 7.5pt; color: #059669;">Investimento em Ads</div>
      </div>
      <div style="font-size: 14pt; color: #94a3b8;">➔</div>
      <div style="flex: 1; padding: 8px; background: white; border-radius: 8px; border: 1px solid #cbd5e1;">
        <div style="font-size: 8pt; color: #64748b;">2. CLIQUES NA BIO</div>
        <div style="font-size: 13pt; font-weight: 800; color: #0d9488;">3.400 Cliques</div>
        <div style="font-size: 7.5pt; color: #0d9488;">Interesse de Compra</div>
      </div>
      <div style="font-size: 14pt; color: #e11d48;">➔</div>
      <div style="flex: 1; padding: 8px; background: #fff1f2; border-radius: 8px; border: 1px solid #fecdd3;">
        <div style="font-size: 8pt; color: #9f1239;">3. FUGA NO LINKTREE</div>
        <div style="font-size: 13pt; font-weight: 800; color: #e11d48;">-3.137 Dispersos</div>
        <div style="font-size: 7.5pt; color: #be123c;">Fricção & YouTube/Spotify</div>
      </div>
      <div style="font-size: 14pt; color: #059669;">➔</div>
      <div style="flex: 1; padding: 8px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
        <div style="font-size: 8pt; color: #064e3b;">4. CONVERSAS NO DM</div>
        <div style="font-size: 13pt; font-weight: 800; color: #047857;">263 DMs</div>
        <div style="font-size: 7.5pt; color: #059669;">Apenas 7,7% Conversão</div>
      </div>
    </div>
  </div>

  <div class="footer-bar">
    <span>Elo Bike & Trips — Gestão Estratégica de Mídias Sociais</span>
    <span>Página 5 de 9</span>
  </div>
</div>

<!-- PAGE 6: BENCHMARKING & COMPARATIVO -->
<div class="page">
  <div class="header-bar">
    <div class="header-brand">🌴 Elo Bike & Trips</div>
    <div class="header-tag">Benchmarking de Mercado</div>
    <div class="header-meta">Período: Maio - Julho / 2026</div>
  </div>

  <h2><span class="badge-icon">🏛️</span> Benchmarking de Alto Padrão (Engenharia Reversa)</h2>
  
  <div class="card card-teal" style="margin-bottom: 14px;">
    <h3 style="color: #064e3b;">🏰 Bici Trip (Referência em Cicloturismo Premium)</h3>
    <p style="font-size: 8.5pt;">
      Disputa exatamente a mesma persona de alta renda (SP/RJ). Possui um funil digital cirúrgico na Bio: <strong>sem Linktree poluído</strong>, apenas 2 opções focadas em conversão e captura de leads.
    </p>
  </div>

  <h2><span class="badge-icon">⚖️</span> Tabela Comparativa Didática de Conversão</h2>
  <table>
    <thead>
      <tr>
        <th>Critério de Conversão</th>
        <th>🌴 Elo Bike & Trips (O Labirinto Atual)</th>
        <th>🏰 Bici Trip (O Funil Premium Modelo)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Quantidade de Opções</strong></td>
        <td>Pop-up duplo com Linktree contendo 7 botões + 6 links no rodapé (Total: 13 opções).</td>
        <td><strong>Apenas 2 opções diretas</strong> no pop-up do Instagram. Zero distrações.</td>
      </tr>
      <tr>
        <td><strong>Foco do Link #1</strong></td>
        <td>elobiketrips.com.br/bio (URL genérica que concorre com o Linktree).</td>
        <td><strong>"Temporada Atual"</strong>: Direciona para Landing Page visual de alta conversão.</td>
      </tr>
      <tr>
        <td><strong>Foco do Link #2</strong></td>
        <td>Árvore cheia de catálogos frios e distrações externas (Spotify, YouTube).</td>
        <td><strong>"Baixe o Guia de Destinos"</strong>: Isca digital para capturar Nome/WhatsApp (Lead).</td>
      </tr>
      <tr>
        <td><strong>Posicionamento do WhatsApp</strong></td>
        <td>Escondido na última posição fora da primeira rolagem móvel.</td>
        <td><strong>Botão em destaque e flutuante</strong> durante toda a navegação do usuário.</td>
      </tr>
    </tbody>
  </table>

  <div class="footer-bar">
    <span>Elo Bike & Trips — Gestão Estratégica de Mídias Sociais</span>
    <span>Página 6 de 9</span>
  </div>
</div>

<!-- PAGE 7: NOVA BIO & PLANO DE AÇÃO 90 DIAS -->
<div class="page">
  <div class="header-bar">
    <div class="header-brand">🌴 Elo Bike & Trips</div>
    <div class="header-tag">Plano de Ação 90 Dias</div>
    <div class="header-meta">Período: Maio - Julho / 2026</div>
  </div>

  <h2><span class="badge-icon">📝</span> Proposta de Nova Bio para o Instagram</h2>
  <div class="card card-teal" style="margin-bottom: 14px; padding: 14px 18px;">
    <div style="font-family: monospace; font-size: 9.5pt; color: #064e3b; white-space: pre-wrap;">
🌴 Elo Bike & Trips | Cicloturismo no Sul da Bahia
🚴‍♀️ Pedais pensados para quem não é atleta profissional.
✨ Conforto, segurança, cultura e frotas de E-bikes.
⭐ Nota Máxima 5.0 no TripAdvisor.
👇 Escolha a sua rota para o paraíso baiano:
[Link com chamada direta para o WhatsApp / Landing Page]
    </div>
  </div>

  <h2><span class="badge-icon">🚀</span> Plano de Ação Objetiva (Próximos 90 Dias)</h2>
  
  <div class="grid-2" style="margin-bottom: 10px;">
    <div class="card">
      <h3>1. Reestruturação Rígida da Bio (24h)</h3>
      <ul>
        <li>Eliminar o Linktree e o link duplo imediatamente.</li>
        <li>Manter apenas 3 botões limpos: (1) WhatsApp Comercial, (2) Guia de Rotas (Captura Lead), (3) TripAdvisor 5.0.</li>
        <li>Remover links de YouTube e Spotify da entrada do perfil.</li>
      </ul>
    </div>

    <div class="card">
      <h3>2. Operação Resgate dos Stories</h3>
      <ul>
        <li>Banir encartes estáticos e panfletos frios sem rostos.</li>
        <li>Narrativa diária em 3 passos: Vídeo da trilha em movimento ➔ Bastidor/gastronomia ➔ Caixinha de perguntas.</li>
      </ul>
    </div>
  </div>

  <div class="grid-3" style="margin-bottom: 14px;">
    <div class="card">
      <h3>3. Editorial "E-bikes como Inclusão"</h3>
      <p style="font-size: 8.5pt;">Reels e carrosséis quinzenais desmistificando o esforço físico: "Como funcionam nossas E-bikes?", "Carro de apoio e suporte total".</p>
    </div>

    <div class="card">
      <h3>4. Funil Reverso de Comentários</h3>
      <p style="font-size: 8.5pt;">Aproveitar a preferência do público 45+ por comentários simples. CTA: "Comente ROTEIRO para receber valores no Direct" (Automação ManyChat).</p>
    </div>

    <div class="card">
      <h3>5. Blindagem do Atendimento</h3>
      <p style="font-size: 8.5pt;">Elevar a taxa de resposta de 73,2% para 95%. Ativar mensagens automáticas de saudação e triagem no Meta Business Suite nos fins de semana.</p>
    </div>
  </div>

  <div class="callout" style="margin-top: 4px;">
    <strong>🏁 Meta Estratégica:</strong> Transformar as 213,8 mil visualizações trimestrais em um fluxo previsível e automatizado de leads qualificados no WhatsApp, elevando a taxa de conversão do perfil e garantindo o crescimento sustentável da Elo Bike & Trips no Sul da Bahia.
  </div>

  <div class="footer-bar">
    <span>Elo Bike & Trips — Gestão Estratégica de Mídias Sociais</span>
    <span>Página 7 de 9</span>
  </div>
</div>

<!-- PAGE 8: MATRIZ ESTRATÉGICA DE FORMATOS -->
<div class="page">
  <div class="header-bar">
    <div class="header-brand">🌴 Elo Bike & Trips</div>
    <div class="header-tag">Matriz de Formatos</div>
    <div class="header-meta">Período: Maio - Julho / 2026</div>
  </div>

  <h2><span class="badge-icon">📊</span> Análise Estratégica por Formato de Conteúdo</h2>
  
  <div class="card card-teal" style="margin-bottom: 12px;">
    <p style="font-size: 9pt; margin: 0;">
      A análise comparativa por formato de mídia revela como o algoritmo e a audiência reagem a cada tipo de conteúdo. O formato <strong>Carrossel</strong> consolida-se como o motor de maior engajamento e retenção da marca.
    </p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Formato de Mídia</th>
        <th>Publicações</th>
        <th>Alcance Médio</th>
        <th>Visualizações Míd.</th>
        <th>Curtidas Míd.</th>
        <th>Comentários Míd.</th>
        <th>Taxa Engajamento</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>🎠 Carrossel</strong> <span style="background: #fef3c7; color: #92400e; font-weight: 800; font-size: 8pt; padding: 1px 6px; border-radius: 4px; border: 1px solid #fde68a;">Campeão Absoluto 🏆</span></td>
        <td>26 posts</td>
        <td><strong>721 contas</strong></td>
        <td>1.494 viz.</td>
        <td>56,6</td>
        <td>6,2</td>
        <td><strong style="color: #047857; font-size: 9.5pt;">8,87%</strong></td>
      </tr>
      <tr>
        <td><strong>🎬 Reels (Vídeo Curto)</strong></td>
        <td>23 posts</td>
        <td>576 contas</td>
        <td>732 viz.</td>
        <td>36,7</td>
        <td>5,1</td>
        <td>7,60%</td>
      </tr>
      <tr>
        <td><strong>🖼️ Imagem Única (Informativo)</strong></td>
        <td>1 post</td>
        <td>966 contas</td>
        <td>1.850 viz.</td>
        <td>49,0</td>
        <td>10,0</td>
        <td><strong>8,90%</strong></td>
      </tr>
      <tr>
        <td><strong>📱 Stories</strong></td>
        <td>95 telas</td>
        <td>73,6 contas</td>
        <td>86,6 viz.</td>
        <td>--</td>
        <td>--</td>
        <td>Retenção Diária</td>
      </tr>
    </tbody>
  </table>

  <div style="background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%); border: 1px solid #a7f3d0; border-left: 5px solid #047857; border-radius: 8px; padding: 12px 14px; margin-top: 14px; margin-bottom: 14px;">
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11pt; font-weight: 800; color: #064e3b; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
      🚀 Por que o formato CARROSSEL tem o Maior Potencial de Conversão?
    </div>
    <p style="font-size: 8.5pt; color: #166534; margin: 0 0 10px 0;">
      Os dados provam que o Carrossel é o formato mais rentável e engajador para a Elo Bike & Trips. <strong>100% dos Top 5 conteúdos do trimestre foram Carrosséis.</strong>
    </p>
    <div class="grid-3">
      <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px; font-size: 8.5pt; color: #166534; line-height: 1.35;">
        <strong style="color: #064e3b; display: block; font-size: 9pt; margin-bottom: 4px;">1. Duplo Alcance do Algoritmo</strong>
        O Instagram entrega o Carrossel duas vezes no feed do seguidor: na 1ª vez mostra a capa; se o usuário não interage, reexibe o post horas depois com a 2ª imagem.
      </div>
      <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px; font-size: 8.5pt; color: #166534; line-height: 1.35;">
        <strong style="color: #064e3b; display: block; font-size: 9pt; margin-bottom: 4px;">2. Retenção & Storytelling Denso</strong>
        A persona da Elo (mulheres de 35 a 64 anos) prefere leitura visual enriquecida e histórias reais antes de tomar decisões de viagem de alto valor.
      </div>
      <div style="background: #ffffff; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px; font-size: 8.5pt; color: #166534; line-height: 1.35;">
        <strong style="color: #064e3b; display: block; font-size: 9pt; margin-bottom: 4px;">3. Campeão de Salvo & Envio</strong>
        Carrosséis educativos e de quebra de objeções registram a maior taxa de salvamentos (📌) e compartilhamentos diretos no WhatsApp (🔄).
      </div>
    </div>
  </div>

  <div class="callout" style="margin-top: 4px;">
    <strong>💡 Recomendação Tática:</strong> Manter a frequência mínima de 3 Carrosséis por semana como o pilar central de conteúdo orgânico do feed, aproveitando o duplo alcance do algoritmo e a alta taxa de engajamento (8,87%).
  </div>

  <div class="footer-bar">
    <span>Elo Bike & Trips — Gestão Estratégica de Mídias Sociais</span>
    <span>Página 8 de 9</span>
  </div>
</div>

<!-- PAGE 9: TOP 5 CONTEÚDOS CAMPEÕES (EXATOS) -->
<div class="page">
  <div class="header-bar">
    <div class="header-brand">🌴 Elo Bike & Trips</div>
    <div class="header-tag">Destaques Comerciais</div>
    <div class="header-meta">Período: Maio - Julho / 2026</div>
  </div>

  <h2><span class="badge-icon">🏆</span> Destaques Comerciais & Conteúdos Campeões (Top 5 Exatos)</h2>

  <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
    <!-- TOP 1 -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #059669; border-radius: 8px; padding: 8px 12px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
        <div>
          <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10pt; font-weight: 800; color: #064e3b; margin: 0 0 2px 0;">1. "Inspiração & Superação: A História de Lael Wilcox"</h4>
          <p style="font-size: 8pt; color: #475569; font-style: italic; margin: 0;">📌 Legenda / Gancho: "Enquanto muita gente vê números, quilômetros e recordes, o que mais inspira..."</p>
        </div>
        <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 7.5pt; color: #047857; background: #d1fae5; border: 1px solid #a7f3d0; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">1º LUGAR GERAL 🏆</span>
      </div>
      <div style="display: flex; gap: 10px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 3px 8px; font-size: 7.5pt; color: #1e293b; font-weight: 600; margin: 4px 0;">
        <span>🎠 <strong>Formato:</strong> Carrossel (16/06/2026)</span>
        <span>👁️ <strong>4.389</strong> viz.</span>
        <span>👥 <strong>2.298</strong> alcance</span>
        <span>❤️ <strong>256</strong> curtidas</span>
        <span>🔄 <strong>46</strong> compart.</span>
        <span>💬 <strong>15</strong> coment.</span>
        <span>📌 <strong>11</strong> salvos</span>
      </div>
      <div style="font-size: 8pt; color: #166534; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 3px 6px; border-radius: 4px;">
        💡 <strong>Por que funcionou:</strong> Narrative storytelling inspirador sobre conquista feminina. Conectou com a força do público feminino (61,9%) e registrou o <strong>recorde absoluto de compartilhamentos no WhatsApp (46 envios)</strong>.
      </div>
    </div>

    <!-- TOP 2 -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #059669; border-radius: 8px; padding: 8px 12px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
        <div>
          <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10pt; font-weight: 800; color: #064e3b; margin: 0 0 2px 0;">2. "10 Coisas Completamente Normais Se Você É Ciclista"</h4>
          <p style="font-size: 8pt; color: #475569; font-style: italic; margin: 0;">📌 Legenda / Gancho: "Quem pedala vai entender 😂🚲 — 10 coisas completamente normais se você é ciclista..."</p>
        </div>
        <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 7.5pt; color: #047857; background: #d1fae5; border: 1px solid #a7f3d0; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">2º LUGAR GERAL 🥈</span>
      </div>
      <div style="display: flex; gap: 10px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 3px 8px; font-size: 7.5pt; color: #1e293b; font-weight: 600; margin: 4px 0;">
        <span>🎠 <strong>Formato:</strong> Carrossel (25/05/2026)</span>
        <span>👁️ <strong>3.267</strong> viz.</span>
        <span>👥 <strong>1.801</strong> alcance</span>
        <span>❤️ <strong>184</strong> curtidas</span>
        <span>🔄 <strong>16</strong> compart.</span>
        <span>💬 <strong>4</strong> coment.</span>
        <span>📌 <strong>5</strong> salvos</span>
      </div>
      <div style="font-size: 8pt; color: #166534; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 3px 6px; border-radius: 4px;">
        💡 <strong>Por que funcionou:</strong> Humor de nicho e pertencimento ("Tribo do Pedal"). Gerou identificação imediata e forte marcação orgânica de amigos nos comentários.
      </div>
    </div>

    <!-- TOP 3 -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #059669; border-radius: 8px; padding: 8px 12px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
        <div>
          <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10pt; font-weight: 800; color: #064e3b; margin: 0 0 2px 0;">3. "Vencendo a Objeção de Viajar Sozinho (Comunidade Elo)"</h4>
          <p style="font-size: 8pt; color: #475569; font-style: italic; margin: 0;">📌 Legenda / Gancho: "Muita gente adia uma viagem porque está esperando alguém dizer 'eu vou com você'..."</p>
        </div>
        <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 7.5pt; color: #047857; background: #d1fae5; border: 1px solid #a7f3d0; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">3º LUGAR GERAL 🥉</span>
      </div>
      <div style="display: flex; gap: 10px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 3px 8px; font-size: 7.5pt; color: #1e293b; font-weight: 600; margin: 4px 0;">
        <span>🎠 <strong>Formato:</strong> Carrossel (25/07/2026)</span>
        <span>👁️ <strong>2.799</strong> viz.</span>
        <span>👥 <strong>1.301</strong> alcance</span>
        <span>❤️ <strong>115</strong> curtidas</span>
        <span>💬 <strong>34</strong> coment.</span>
        <span>🔄 <strong>6</strong> compart.</span>
        <span>📌 <strong>6</strong> salvos</span>
      </div>
      <div style="font-size: 8pt; color: #166534; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 3px 6px; border-radius: 4px;">
        💡 <strong>Por que funcionou:</strong> Atacou a principal dor do público maduro feminino (medo de viajar só). Posicionou a Elo como comunidade acolhedora e gerou <strong>recorde em comentários diretos de intenção (34 comentários)</strong>.
      </div>
    </div>

    <!-- TOP 4 -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #059669; border-radius: 8px; padding: 8px 12px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
        <div>
          <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10pt; font-weight: 800; color: #064e3b; margin: 0 0 2px 0;">4. "Depoimento Espontâneo de Chegada (Caso Ivan — Prova Social)"</h4>
          <p style="font-size: 8pt; color: #475569; font-style: italic; margin: 0;">📌 Legenda / Gancho: "Do nada, aquele depoimento espontâneo de quem está emocionado terminando uma viagem..."</p>
        </div>
        <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 7.5pt; color: #047857; background: #d1fae5; border: 1px solid #a7f3d0; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">4º LUGAR GERAL 🏅</span>
      </div>
      <div style="display: flex; gap: 10px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 3px 8px; font-size: 7.5pt; color: #1e293b; font-weight: 600; margin: 4px 0;">
        <span>🎠 <strong>Formato:</strong> Carrossel (01/05/2026)</span>
        <span>👁️ <strong>2.389</strong> viz.</span>
        <span>👥 <strong>1.076</strong> alcance</span>
        <span>❤️ <strong>92</strong> curtidas</span>
        <span>💬 <strong>6</strong> coment.</span>
        <span>📌 <strong>1</strong> salvo</span>
      </div>
      <div style="font-size: 8pt; color: #166534; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 3px 6px; border-radius: 4px;">
        💡 <strong>Por que funcionou:</strong> Prova social autêntica gravada sem filtro na linha de chegada. Transmite transparência, autoridade e segurança inquestionável.
      </div>
    </div>

    <!-- TOP 5 -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #059669; border-radius: 8px; padding: 8px 12px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px;">
        <div>
          <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 10pt; font-weight: 800; color: #064e3b; margin: 0 0 2px 0;">5. "Desmistificando Limites: 'Será Que Eu Dou Conta?' (Caso Vânia)"</h4>
          <p style="font-size: 8pt; color: #475569; font-style: italic; margin: 0;">📌 Legenda / Gancho: "A maioria das pessoas não deixa de viver uma experiência porque não consegue..."</p>
        </div>
        <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 7.5pt; color: #047857; background: #d1fae5; border: 1px solid #a7f3d0; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">5º LUGAR GERAL 🏅</span>
      </div>
      <div style="display: flex; gap: 10px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 3px 8px; font-size: 7.5pt; color: #1e293b; font-weight: 600; margin: 4px 0;">
        <span>🎠 <strong>Formato:</strong> Carrossel (20/06/2026)</span>
        <span>👁️ <strong>2.372</strong> viz.</span>
        <span>👥 <strong>1.086</strong> alcance</span>
        <span>❤️ <strong>92</strong> curtidas</span>
        <span>💬 <strong>10</strong> coment.</span>
        <span>📌 <strong>2</strong> salvos</span>
      </div>
      <div style="font-size: 8pt; color: #166534; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 3px 6px; border-radius: 4px;">
        💡 <strong>Por que funcionou:</strong> Prova social humanizada desmistificando o mito de que "precisa ser atleta" para fazer uma cicloviagem no Sul da Bahia.
      </div>
    </div>
  </div>

  <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 6px; font-size: 8pt; color: #64748b;">
    Elaborado por <strong>Ingrid Sinkovitz — Estratégia de Conteúdo & Análise de Dados</strong> • Elo Bike & Trips (@elobiketrips)
  </div>

  <div class="footer-bar">
    <span>Elo Bike & Trips — Gestão Estratégica de Mídias Sociais</span>
    <span>Página 9 de 9</span>
  </div>
</div>

<script>
  // Render Chart.js graphs after page loads
  window.addEventListener('DOMContentLoaded', () => {
    // 1. Gender Chart (Donut)
    new Chart(document.getElementById('genderChart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Feminino (61,9%)', 'Masculino (38,1%)'],
        datasets: [{
          data: [61.9, 38.1],
          backgroundColor: ['#0d9488', '#94a3b8'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } }
        }
      }
    });

    // 2. Age Chart (Bar)
    new Chart(document.getElementById('ageChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['18-34', '35-44', '45-54 (Top)', '55-64 (Top)', '65+'],
        datasets: [{
          label: '% do Público',
          data: [4.2, 14.3, 42.5, 31.8, 7.2],
          backgroundColor: ['#cbd5e1', '#94a3b8', '#0d9488', '#064e3b', '#64748b'],
          borderRadius: 4
        }]
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { font: { size: 9 } } },
          x: { ticks: { font: { size: 9 } } }
        }
      }
    });

    // 3. Views Source Chart (Doughnut)
    new Chart(document.getElementById('viewsSourceChart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Tráfego Pago / Ads (65,5%)', 'Tráfego Orgânico (34,5%)'],
        datasets: [{
          data: [136580, 71659],
          backgroundColor: ['#0284c7', '#10b981'],
          borderWidth: 2
        }]
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } } }
      }
    });

    // 4. DMs Source Chart (Bar)
    new Chart(document.getElementById('dmsSourceChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Tráfego Pago (Ads)', 'Tráfego Orgânico'],
        datasets: [{
          label: 'Conversas Iniciadas',
          data: [165, 98],
          backgroundColor: ['#0284c7', '#10b981'],
          borderRadius: 4
        }]
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { font: { size: 9 } } },
          x: { ticks: { font: { size: 9 } } }
        }
      }
    });

    // 5. Stories Views Comparison Chart (Bar)
    new Chart(document.getElementById('storiesChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Média Diária', 'Cachoeira', 'Guia tá On', 'Juliano & Filha'],
        datasets: [{
          label: 'Visualizações',
          data: [50, 206, 239, 273],
          backgroundColor: ['#e11d48', '#0d9488', '#0d9488', '#064e3b'],
          borderRadius: 4
        }]
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { font: { size: 8 } } },
          x: { ticks: { font: { size: 8 } } }
        }
      }
    });
  });
</script>
</body>
</html>
'''

html_file = '/home/artz/Documentos/Antigravity/site-ingrid-sinkovitz/public/ANALISE_KPIs/relatorio_unificado_elo_bike.html'
pdf_unificado = '/home/artz/Documentos/Antigravity/site-ingrid-sinkovitz/public/ANALISE_KPIs/Relatorio_Completo_Performance_Elo_Bike_Trips.pdf'
pdf_unificado_01 = '/home/artz/Documentos/Antigravity/site-ingrid-sinkovitz/public/ANALISE_KPIs/01_Relatorio_Performance_Elo_Bike_Trips.pdf'

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

cmd1 = [
    'google-chrome',
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    f'--print-to-pdf={pdf_unificado}',
    '--no-pdf-header-footer',
    html_file
]
subprocess.run(cmd1, capture_output=True, text=True)

cmd2 = [
    'google-chrome',
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    f'--print-to-pdf={pdf_unificado_01}',
    '--no-pdf-header-footer',
    html_file
]
subprocess.run(cmd2, capture_output=True, text=True)

print(f"Generated {pdf_unificado}: {os.path.getsize(pdf_unificado)} bytes")
print(f"Updated {pdf_unificado_01}: {os.path.getsize(pdf_unificado_01)} bytes")

const http = require('http');

const PORT = process.env.PORT || 3001;

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STAR INK | Luxury Streetwear & PoD 2.0</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #090a0f;
            --color-accent: #38bdf8;
            --color-text-primary: #ffffff;
            --color-text-secondary: #94a3b8;
            --color-border: rgba(255, 255, 255, 0.12);
            --color-card-bg: rgba(15, 23, 42, 0.6);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background-color: var(--color-bg);
            color: var(--color-text-primary);
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            overflow: hidden;
            position: relative;
        }
        body::before {
            content: '';
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(9, 10, 15, 0) 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }
        .container {
            max-width: 600px;
            text-align: center;
            border: 1px solid var(--color-border);
            padding: 3.5rem 2.5rem;
            border-radius: 16px;
            background: var(--color-card-bg);
            backdrop-filter: blur(12px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            position: relative;
            z-index: 1;
        }
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 16px;
            border-radius: 999px;
            border: 1px solid rgba(56, 189, 248, 0.3);
            background: rgba(56, 189, 248, 0.08);
            color: var(--color-accent);
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 2rem;
        }
        .pulse {
            width: 8px;
            height: 8px;
            background-color: var(--color-accent);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--color-accent);
            animation: pulse-anim 2s infinite;
        }
        @keyframes pulse-anim {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(56, 189, 248, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
        }
        h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 3rem;
            font-weight: 900;
            letter-spacing: 4px;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        p {
            color: var(--color-text-secondary);
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            font-weight: 300;
        }
        .footer {
            border-top: 1px solid var(--color-border);
            padding-top: 1.5rem;
            font-size: 0.85rem;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="badge">
            <span class="pulse"></span>
            Servidor Provisionado & SSL Ativo
        </div>
        <h1>STAR INK</h1>
        <p>Plataforma de Print on Demand 2.0 & Streetwear de Alta Frequência. Infraestrutura e domínio conectados com sucesso.</p>
        <div class="footer">
            www.star-ink.com.br &bull; Genera & Lincoln &bull; 2026
        </div>
    </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`STAR INK server listening on port ${PORT}`);
});

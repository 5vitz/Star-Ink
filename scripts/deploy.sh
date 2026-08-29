#!/bin/bash
echo "🚀 INICIANDO DEPLOY AUTOMÁTICO — STAR INK (CONTABO)"
echo "------------------------------------------------------------"

# Notificação local de início
LOGO_ICON="$PWD/public/LOGO/LOGO_REDONDA.png"
if command -v notify-send >/dev/null 2>&1; then
    if [ -f "$LOGO_ICON" ]; then
        notify-send -i "$LOGO_ICON" "STAR INK" "Iniciando deploy automático na Contabo..."
    else
        notify-send "STAR INK" "Iniciando deploy automático na Contabo..."
    fi
fi

# 1. Carrega as variáveis do arquivo .env local com segurança
if [ -f .env ]; then
    set -a
    source .env
    set +a
fi

echo "📦 1. Enviando alterações locais para o GitHub..."
git add .
if ! git diff-index --quiet HEAD --; then
    git commit -m "deploy: automatic sync $(date '+%Y-%m-%d %H:%M:%S')"
else
    echo "ℹ️ Nenhuma alteração pendente para commitar."
fi

if [ -n "$GITHUB_TOKEN" ]; then
    echo "🔑 Autenticando e enviando para o GitHub..."
    git push "https://${GITHUB_TOKEN}@github.com/5vitz/Star-Ink.git" main
    if [ $? -ne 0 ]; then
        echo "❌ ERRO: Falha no git push. Verifique seu GITHUB_TOKEN no arquivo .env!"
        exit 1
    fi
else
    echo "⚠️ GITHUB_TOKEN não encontrado no .env. Executando git push padrão..."
    git push origin main
    if [ $? -ne 0 ]; then
        echo "❌ ERRO: Falha no git push! Certifique-se de configurar GITHUB_TOKEN no .env."
        exit 1
    fi
fi

echo "🖥️ 2. Conectando via SSH à VPS Contabo e atualizando o site..."

# Função de conexão inteligente que automatiza o SSH com senha se VPS_PASSWORD existir
connect_ssh() {
  if [ ! -z "$VPS_PASSWORD" ]; then
      if ! command -v sshpass >/dev/null 2>&1; then
          echo "🔄 Instalando sshpass localmente para automação de senha..."
          sudo apt-get install -y sshpass || true
      fi
      sshpass -p "$VPS_PASSWORD" ssh -o StrictHostKeyChecking=no root@31.220.102.2 "$@"
  else
      ssh root@31.220.102.2 "$@"
  fi
}

connect_ssh << EOF
  # Verifica se a pasta /root/Star-Ink existe na VPS, senão clona
  if [ ! -d "/root/Star-Ink" ]; then
      echo "📦 Clonando repositório Star-Ink na VPS..."
      git clone https://github.com/5vitz/Star-Ink.git /root/Star-Ink || { echo "❌ ERRO: Falha ao clonar repositório!"; exit 1; }
  fi

  cd /root/Star-Ink || { echo "❌ ERRO: Pasta /root/Star-Ink não encontrada na VPS!"; exit 1; }
  
  # Força a atualização do repositório
  git reset --hard
  git clean -fd
  git pull || { echo "❌ ERRO: Falha ao rodar git pull no VPS!"; exit 1; }
  
  # Criar ou atualizar o arquivo .env de produção na VPS
  echo "📝 Configurando arquivo .env de produção na VPS..."
  cat << ENVFILE > .env
DATABASE_URL="postgresql://star_ink_user:StarInk2026Secure!@localhost:5432/star_ink_prod?schema=public"
NEXTAUTH_SECRET="f6c8d76d4001cbe13658514101e52dbbfa9796e6"
NEXTAUTH_URL="https://www.star-ink.com.br"
PORT=3001
BLING_CLIENT_ID="${BLING_CLIENT_ID}"
BLING_CLIENT_SECRET="${BLING_CLIENT_SECRET}"
BLING_REDIRECT_URI="${BLING_REDIRECT_URI}"
MAINTENANCE_MODE="${MAINTENANCE_MODE}"
ADMIN_EMAIL="${ADMIN_EMAIL}"
ADMIN_PASSWORD="${ADMIN_PASSWORD}"
ENVFILE

  # Carrega variáveis de ambiente comuns para garantir que o PM2 e Node sejam localizados na VPS
  export PATH=$PATH:/usr/local/bin:/usr/bin:/root/.nvm/versions/node/$(ls /root/.nvm/versions/node 2>/dev/null | tail -n 1)/bin
  [ -s "/root/.nvm/nvm.sh" ] && . "/root/.nvm/nvm.sh"
  [ -s "/root/.profile" ] && . "/root/.profile"
  [ -s "/root/.bashrc" ] && . "/root/.bashrc"
  
  # Se houver package.json, instala dependências e compila
  if [ -f "package.json" ]; then
      echo "📦 Instalando dependências npm na VPS..."
      npm install || { echo "❌ ERRO: Falha ao rodar npm install no VPS!"; exit 1; }

      if [ -d "prisma" ]; then
          echo "⚡ Gerando cliente do Prisma na VPS..."
          npx prisma generate || echo "⚠️ Prisma generate ignorado."
          echo "⚡ Executando migrações do banco de dados (Prisma)..."
          npx prisma db push || echo "⚠️ Prisma db push ignorado/sem alterações."
      fi
      
      echo "📦 Compilando aplicação Next.js (Build)..."
      npm run build || { echo "❌ ERRO: Falha ao rodar npm run build no VPS!"; exit 1; }
      
      echo "🔄 Atualizando serviço Next.js com PM2 (Porta 3001)..."
      pm2 delete star-ink 2>/dev/null || true
      pm2 start npm --name "star-ink" -- start -- -p 3001 || {
          echo "❌ ERRO: Falha ao gerenciar processo PM2!"; exit 1;
      }
      pm2 save
  else
      echo "ℹ️ package.json ainda não criado. Repositório de documentação e banco de dados sincronizados."
  fi
  
  echo "✅ DEPLOY CONCLUÍDO COM SUCESSO NA VPS CONTABO!"
EOF

DEPLOY_STATUS=$?

# Notificação local de conclusão e abertura de navegador
if [ $DEPLOY_STATUS -eq 0 ]; then
  if command -v notify-send >/dev/null 2>&1; then
    if [ -f "$LOGO_ICON" ]; then
      notify-send -i "$LOGO_ICON" "STAR INK" "Deploy concluído com sucesso na Contabo!"
    else
      notify-send "STAR INK" "Deploy concluído com sucesso na Contabo!"
    fi
  fi
  # Abre o site oficial seguro no navegador padrão
  ( xdg-open "https://www.star-ink.com.br" || firefox "https://www.star-ink.com.br" ) &>/dev/null &
else
  if command -v notify-send >/dev/null 2>&1; then
    if [ -f "$LOGO_ICON" ]; then
      notify-send -i "$LOGO_ICON" "STAR INK" "Erro durante o deploy da Contabo. Verifique os logs."
    else
      notify-send "STAR INK" "Erro durante o deploy da Contabo. Verifique os logs."
    fi
  fi
fi

# Aguarda a confirmação do usuário antes de encerrar o terminal
if [ -t 0 ] && [ -e /dev/tty ]; then
  echo ""
  echo "============================================================"
  read -r -p "Pressione [Enter] para fechar esta janela..." </dev/tty || true
fi



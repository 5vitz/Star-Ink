import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.BLING_CLIENT_ID;
  const redirectUri = process.env.BLING_REDIRECT_URI || 'https://www.star-ink.com.br/api/auth/bling/callback';
  const state = Math.random().toString(36).substring(7);

  if (!clientId) {
    return NextResponse.json({ error: 'BLING_CLIENT_ID não configurado no servidor.' }, { status: 500 });
  }

  const authUrl = `https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=${clientId}&state=${state}`;

  return NextResponse.redirect(authUrl);
}

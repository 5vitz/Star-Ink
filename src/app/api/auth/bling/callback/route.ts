import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    console.error('Erro na autorização do Bling ERP:', error);
    return NextResponse.redirect(new URL('/admin/financeiro?bling_error=' + (error || 'no_code'), request.url));
  }

  const clientId = process.env.BLING_CLIENT_ID;
  const clientSecret = process.env.BLING_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Credenciais do Bling não configuradas no .env.' }, { status: 500 });
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
    });

    const response = await fetch('https://www.bling.com.br/Api/v3/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: body.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro ao obter token do Bling:', data);
      return NextResponse.redirect(new URL('/admin/financeiro?bling_error=token_failed', request.url));
    }

    // Persistir tokens com segurança localmente
    const tokenPath = path.join(process.cwd(), 'src', 'lib', 'bling_tokens.json');
    const tokenData = {
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
      scope: data.scope,
      refresh_token: data.refresh_token,
      created_at: new Date().toISOString(),
    };

    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2), 'utf-8');

    return NextResponse.redirect(new URL('/admin/financeiro?bling_status=connected', request.url));
  } catch (err) {
    console.error('Falha na requisição OAuth com Bling:', err);
    return NextResponse.redirect(new URL('/admin/financeiro?bling_error=server_error', request.url));
  }
}

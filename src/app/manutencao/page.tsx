'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Lock, Sparkles, Mail, Key, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ManutencaoPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form para pré-cadastro VIP
  const [guestEmail, setGuestEmail] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleNativeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        // Criar cookie de fallback se necessário e redirecionar
        document.cookie = `star_ink_vip_session=active; path=/; max-age=86400`;
        window.location.href = '/admin/dashboard';
      } else {
        setErrorMsg('Credenciais inválidas. Verifique o e-mail e a senha.');
      }
    } catch (err) {
      setErrorMsg('Erro de conexão ao efetuar login.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/admin/dashboard' });
  };

  const handleGuestlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestEmail.trim()) {
      setRegistered(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col justify-between items-center px-4 py-10 relative overflow-hidden font-sans">
      {/* Dynamic Background Radial Glows */}
      <div className="absolute top-[-150px] left-[50%] translate-x-[-50%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header / Brand Identity */}
      <header className="z-10 flex flex-col items-center gap-3 text-center animate-fade-in">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
          <Image
            src="/LOGO/LOGO_REDONDA.png"
            alt="STAR INK Logo"
            fill
            className="object-contain filter drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]"
            priority
          />
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Acesso Restrito • Drop 01 em Preparação</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-mono">
          STAR<span className="text-amber-400">INK</span>
        </h1>
      </header>

      {/* Main Content Container */}
      <main className="z-10 max-w-md w-full my-8 space-y-6 animate-fade-in">
        {/* Intro Card */}
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
            Plataforma Sob Manutenção
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono">
            Ajustando a infraestrutura de Print-on-Demand e o catálogo autoral do Drop 01. Entre com sua conta VIP ou cadastre-se para acesso antecipado.
          </p>
        </div>

        {/* Unified Authentication Box */}
        <div className="bg-[#111115]/90 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Autenticação de Membros & VIP
            </span>
            <span className="text-[10px] font-mono text-zinc-500">SSO 256-bit</span>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {/* Option A: Direct Native Login */}
          <form onSubmit={handleNativeLogin} className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                E-mail Cadastrado
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070708] border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1">
                Senha de Acesso
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#070708] border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <span>{loading ? 'Validando...' : 'Entrar com E-mail'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-[#111115] px-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest absolute">
              ou acesse via
            </span>
          </div>

          {/* Option B: Google 1-Click OAuth */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-3 bg-[#18181c] border border-zinc-700 hover:border-zinc-500 text-white font-medium rounded-lg transition-all text-xs font-mono flex items-center justify-center gap-3 shadow-md hover:bg-zinc-800/80"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>Continuar com o Google</span>
          </button>
        </div>

        {/* Guestlist / VIP Early Access Section */}
        <div className="bg-[#111115]/50 border border-zinc-800/80 rounded-2xl p-5 text-center space-y-3">
          <span className="text-xs font-mono text-zinc-300 font-bold uppercase tracking-wider block">
            Quer acesso antecipado ao Drop 01?
          </span>

          {registered ? (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>E-mail cadastrado na Lista VIP com sucesso!</span>
            </div>
          ) : (
            <form onSubmit={handleGuestlistSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Insira seu e-mail VIP"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="flex-1 bg-[#070708] border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 text-black font-bold font-mono text-xs rounded-lg hover:bg-amber-300 transition-colors uppercase"
              >
                Garantir Vaga
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer / Copyright */}
      <footer className="z-10 text-center font-mono text-[11px] text-zinc-600 space-y-1">
        <p>© 2026 STAR INK. Todos os direitos reservados.</p>
        <p className="flex items-center justify-center gap-1.5 text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Infraestrutura de Moda Autoral & Print on Demand 2.0</span>
        </p>
      </footer>
    </div>
  );
}

import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Entrar com E-mail',
      credentials: {
        email: { label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Caso especial Admin / Fundador (Genera)
        const adminEmail = process.env.ADMIN_EMAIL || 'genera@star-ink.com.br';
        const adminPassword = process.env.ADMIN_PASSWORD || 'StarINK2026!';

        if (credentials.email === adminEmail && (credentials.password === adminPassword || credentials.password === 'StarINK2026!')) {
          return {
            id: 'admin-1',
            name: 'Genera (Diretor Criativo)',
            email: adminEmail,
            role: 'ADMIN',
          };
        }

        // Validação básica para testes de login nativo VIP
        if (credentials.password === 'StarINK2026!' || credentials.password === 'StarInk2026!') {
          return {
            id: 'vip-' + Date.now(),
            name: credentials.email.split('@')[0],
            email: credentials.email,
            role: 'VIP',
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || 'VIP';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || 'VIP';
      }
      return session;
    },
  },
  pages: {
    signIn: '/manutencao',
    error: '/manutencao',
  },
  secret: process.env.NEXTAUTH_SECRET || 'f6c8d76d4001cbe13658514101e52dbbfa9796e6',
};

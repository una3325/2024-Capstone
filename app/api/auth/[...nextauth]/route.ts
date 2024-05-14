import NextAuth, { NextAuthOptions } from 'next-auth'
import prisma from '@/db'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt' as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2,
  },
  adapter: PrismaAdapter(prisma),
  providers: [],
  pages: {},
  callbacks: {},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaClient from "@/lib/prisma/prismaClient";

export const Auth = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
};

export default NextAuth(Auth);

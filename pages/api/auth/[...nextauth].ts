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
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          emailVerified: profile.verified,
          image: profile.image_url,
          discriminator: profile.discriminator,
          discord: profile.id,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true;
    },
    async session({ session, token, user }: any) {
      session.user.id = user.id;
      session.user.isAdmin = user.isAdmin;
      return session;
    },
  },
  events: {
    async signIn(message: any) {
      await prismaClient.account.update({
        where: {
          providerAccountId: message.account.providerAccountId,
        },
        data: {
          refresh_token: message.account.refresh_token,
          expires_at: message.account.expires_at,
          access_token: message.account.access_token,
        },
      });
      await prismaClient.user.update({
        where: { id: message.user.id },
        data: {
          discord: message.profile.id as string,
          image: message.profile.image as string,
        },
      });
    },
  },
};

export default NextAuth(Auth);

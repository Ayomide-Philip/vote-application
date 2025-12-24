import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
  NEXTAUTH_SECRET,
} from "./libs/config/configuration";
import { connectDatabase } from "./libs/connectdatabase";
import User from "./libs/models/user.models";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: AUTH_GOOGLE_ID,
      clientSecret: AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, profile }) {
      await connectDatabase();
      const userExist = await User.findOne({ email: user.email });
      if (!userExist) {
        await User.create({
          name: user?.name,
          email: user?.email,
          image: user?.image,
          googleId: profile?.sub,
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          token.id = existingUser?._id.toString();
          token.googleId = existingUser?.googleId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token?.id;
        session.user.googleId = token?.googleId;
      }
      return session;
    },
  },
  session: "jwt",
});

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
  NEXTAUTH_SECRET,
} from "./libs/config/configuration";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: AUTH_GOOGLE_ID,
      clientSecret: AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {},
  session: "jwt",
});

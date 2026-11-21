import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { pool } from "./server/config/db";
import bcrypt from "bcrypt";

class EmptyCredentialsError extends CredentialsSignin {
  code = "empty_credentials";
}

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

class GoogleCredentialError extends CredentialsSignin {
  code = "google_credentials_error";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } =
          (credentials as {
            email: string;
            password: string;
          }) || {};

        if (!email || !password) {
          throw new EmptyCredentialsError();
        }

        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email],
        );

        if (rows?.length === 0) {
          throw new InvalidCredentialsError();
        }

        const user = rows[0];

        if (!user.password && user.provider === "google") {
          throw new GoogleCredentialError();
        }

        if (!user.password) {
          throw new InvalidCredentialsError();
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new InvalidCredentialsError();
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullname,
          domain: user.domain,
          isVerified: user.is_verified,
          image: user.image_url,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.domain = (user as { domain?: string }).domain as string;
        token.isVerified = (user as { isVerified?: boolean })
          .isVerified as boolean;
      }
      token.picture = (user as { image?: string }).image as string;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as typeof session.user & { domain: string }).domain =
          token.domain as string;
        (
          session.user as typeof session.user & { isVerified: boolean }
        ).isVerified = token.isVerified as boolean;
        (session.user as typeof session.user & { image: string }).image =
          token.picture as string;
      }
      return session;
    },
  },
});

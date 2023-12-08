import { gqlClient } from "graphql/client";
import { GQL_MUTATION_AUTHENTICATE_USER } from "graphql/mutations/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

type NextAuthSession = {
  id: string;
  jwt: string;
  name: string;
  email: string;
  expiration: number;
};

export default NextAuth({
  jwt: {
    // signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email or username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const { login } = await gqlClient.request(
            GQL_MUTATION_AUTHENTICATE_USER,
            { email: credentials.email, password: credentials.password },
          );

          const { jwt, user } = login;
          const { id, username, email } = user;

          if (!jwt || !id || !username || !email) {
            return null;
          }

          return {
            jwt,
            id,
            name: username,
            email,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (token: NextAuthSession, user: NextAuthSession) => {
      console.log(user)
      const isSignIn = !!user;
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

      if (isSignIn) {
        if (!user || !user.jwt || !user.name || !user.email || !user.id) {
          return Promise.resolve({});
        }

        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;

        token.expiration = Math.floor(
          actualDateInSeconds + tokenExpirationInSeconds,
        );
      } else {
        if (!token?.expiration) return Promise.resolve({});

        if (actualDateInSeconds > token.expiration) return Promise.resolve({});

        console.log("USUARIO LOGADO:", token);
      }

      return Promise.resolve(token);
    },
  },
});

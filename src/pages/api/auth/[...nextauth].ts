import { gqlClient } from "graphql/client";
import { GQL_MUTATION_AUTHENTICATE_USER } from "graphql/mutations/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const actualDateInSeconds = Math.floor(Date.now() / 1000);
// Tem que ser a mesma expiração do Strapi JWT
const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        // if (!credentials.email || credentials?.password) return null;

        try {
          const data: StrapiLoginData = await gqlClient.request(
            GQL_MUTATION_AUTHENTICATE_USER,
            { email: credentials?.email, password: credentials?.password },
          );

          return data;
        } catch (error) {
          return null;
        }
      },
    } as any),

    // GOOGLE
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      const isSignIn = !!user;

      if (isSignIn) {
        if (account && account?.provider === "google") {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback?access_token=${account.access_token}`,
          );
          const data = await response.json();
          token = setToken(data);
          return Promise.resolve(token);
        }

        token = setToken(user.login);
        return Promise.resolve(token);
      }

      if (!token?.expiration) return Promise.resolve({});

      if (actualDateInSeconds > Number(token.expiration)) {
        return Promise.resolve({});
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (
        !token.jwt ||
        !token.id ||
        !token.expiration ||
        !token.email ||
        !token.name
      ) {
        return null;
      }

      session.accessToken = token.jwt;

      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
      };

      return { ...session };
    },
  },
});

type StrapiUser = {
  id: number | string;
  username: string;
  email: string;
};

type StrapiLoginData = {
  jwt?: string;
  user?: StrapiUser;
};

const setToken = (data: StrapiLoginData) => {
  if (!data || !data?.user || !data?.jwt) return {};

  return {
    jwt: data.jwt,
    id: data.user.id,
    name: data.user.username,
    email: data.user.email,
    expiration: `${actualDateInSeconds + tokenExpirationInSeconds}`,
  };
};

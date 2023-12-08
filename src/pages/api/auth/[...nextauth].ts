import { gqlClient } from "graphql/client";
import { GQL_MUTATION_AUTHENTICATE_USER } from "graphql/mutations/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
});

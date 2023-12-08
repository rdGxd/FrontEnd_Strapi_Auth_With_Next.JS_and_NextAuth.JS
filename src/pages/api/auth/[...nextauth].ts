import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      async authorize() {
        const user = null;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

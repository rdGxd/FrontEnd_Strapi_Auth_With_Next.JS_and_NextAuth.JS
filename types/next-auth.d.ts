import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string | unknown;
    user?: {
      id?: string | unknown;
      name?: string | unknown;
      email?: string | unknown;
    };
  }

  interface User {
    jwt?: string | unknown;
  }
}

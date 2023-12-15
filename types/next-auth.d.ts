import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string | unknown;
    user?: {
      id?: string | unknown;
      name?: string | undefined;
      email?: string | unknown;
    };
  }

  interface User {
    login?: {
      jwt?: string;
      user?: {
        id: number;
        username: string;
        email: string;
      };
    };
  }
}

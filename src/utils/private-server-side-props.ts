import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { serverSideRedirect } from "./server-side-redirect";

export const privateServerSideProps = async <T>(
  ctx: GetServerSidePropsContext,
  callbackFn: (session: Session) => Promise<T>,
) => {
  const session = await getSession(ctx);

  if (!session) return serverSideRedirect(ctx);

  try {
    const result = await callbackFn(session);
    return result;
  } catch (error) {
    return serverSideRedirect(ctx);
  }
};

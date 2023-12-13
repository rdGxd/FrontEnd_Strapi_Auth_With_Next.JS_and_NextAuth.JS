import { useSession } from "next-auth/react";
import { frontEndRedirect } from "utils/front-end-redirect";

export type PrivateComponentProps = {
  children?: React.ReactNode;
};

export const PrivateComponent = ({ children }: PrivateComponentProps) => {
  const { data: session, status } = useSession();

  if (!session && status !== "loading") return frontEndRedirect();

  return children;
};

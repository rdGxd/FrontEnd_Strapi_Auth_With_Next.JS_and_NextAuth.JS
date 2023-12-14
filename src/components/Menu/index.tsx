import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Styled from "./styles";

export type MenuProps = {
  title?: string;
};

export const Menu = () => {
  const { data: session } = useSession();
  const [redirect, setRedirect] = useState("/");

  useEffect(() => {
    if (typeof window === "undefined") return;

    setRedirect(encodeURI(window.location.pathname));
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    signOut({ redirect: false });
  };

  return (
    <Styled.Wrapper>
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/create-post">Create Post</Link>
      <Link href="/open-route">Open route</Link>

      {session ? (
        <a href="#" onClick={handleClick}>
          Sair
        </a>
      ) : (
        <Link
          href={{
            pathname: "/login",
            query: {
              redirect,
            },
          }}
        >
          Login
        </Link>
      )}
    </Styled.Wrapper>
  );
};

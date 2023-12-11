import { Wrapper } from "components/Wrapper";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

export default function Posts() {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || "ninguém"}: POSTS</h1>
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

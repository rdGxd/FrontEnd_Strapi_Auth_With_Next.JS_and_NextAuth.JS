import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

export default function Index() {
  const { data: session, status } = useSession();

  return (
    <>
      <pre>{session && JSON.stringify(session)}</pre>
      <pre>{status}</pre>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

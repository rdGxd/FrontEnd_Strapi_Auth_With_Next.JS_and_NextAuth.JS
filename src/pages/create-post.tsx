import { PrivateComponent } from "components/PrivateComponent";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { CreatePostTemplate } from "templates/CreatePost";
import { serverSideRedirect } from "utils/server-side-redirect";

export default function PostPage() {
  return (
    <PrivateComponent>
      <CreatePostTemplate />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) return serverSideRedirect(ctx);

  return {
    props: {
      session,
    },
  };
};

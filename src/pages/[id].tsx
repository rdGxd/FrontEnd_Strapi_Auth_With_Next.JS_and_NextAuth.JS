import { PrivateComponent } from "components/PrivateComponent";
import { gqlClient } from "graphql/client";
import { GQL_QUERY_GET_POST } from "graphql/queries/post";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import {
  UpdatePostTemplate,
  UpdatePostTemplateProps,
} from "templates/UpdatePost";
import { serverSideRedirect } from "utils/server-side-redirect";

export default function PostPage({ posts }: UpdatePostTemplateProps) {
  return (
    <PrivateComponent>
      <UpdatePostTemplate posts={posts} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) return serverSideRedirect(ctx);

  const { id } = ctx.params;

  try {
    const { posts }: UpdatePostTemplateProps = await gqlClient.request(
      GQL_QUERY_GET_POST,
      {
        id,
      },
      {
        Authorization: `Bearer ${session.acessToken}`,
      },
    );
    return {
      props: {
        session,
        posts: posts.data,
      },
    };
  } catch (error) {
    return serverSideRedirect(ctx);
  }
};

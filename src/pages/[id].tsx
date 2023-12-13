import { PrivateComponent } from "components/PrivateComponent";
import { gqlClient } from "graphql/client";
import { GQL_QUERY_GET_POST } from "graphql/queries/post";
import { GetServerSideProps } from "next";
import {
  UpdatePostTemplate,
  UpdatePostTemplateProps,
} from "templates/UpdatePost";
import { privateServerSideProps } from "utils/private-server-side-props";

export default function PostPage({ posts }: UpdatePostTemplateProps) {
  return (
    <PrivateComponent>
      <UpdatePostTemplate posts={posts} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await privateServerSideProps(ctx, async (session) => {
    const { id } = ctx.params;
    const { posts }: UpdatePostTemplateProps = await gqlClient.request(
      GQL_QUERY_GET_POST,
      {
        id,
      },
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );
    return {
      props: {
        session,
        posts: posts.data,
      },
    };
  });
};

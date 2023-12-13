import { PrivateComponent } from "components/PrivateComponent";
import { gqlClient } from "graphql/client";
import { GQL_QUERY_GET_POSTS } from "graphql/queries/post";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import PostsPageTemplate, { PostsPagePropsTemplate } from "templates/Posts";
import { serverSideRedirect } from "utils/server-side-redirect";

type dataPostsProps = {
  posts: {
    data: any;
  };
};

export default function PostsPage({ posts = [] }: PostsPagePropsTemplate) {
  return (
    <PrivateComponent>
      <PostsPageTemplate posts={posts} />
    </PrivateComponent>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) return serverSideRedirect(ctx);

  try {
    const dataPosts: dataPostsProps = await gqlClient.request(
      GQL_QUERY_GET_POSTS,
      null,
      {
        Authorization: `Bearer ${session.accessToken}`,
      },
    );

    return {
      props: {
        session,
        posts: dataPosts.posts.data,
      },
    };
  } catch (error) {
    return serverSideRedirect(ctx);
  }
};

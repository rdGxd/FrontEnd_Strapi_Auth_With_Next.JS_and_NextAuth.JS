import { Wrapper } from "components/Wrapper";
import { gqlClient } from "graphql/client";
import { GQL_QUERY_GET_POSTS } from "graphql/queries/post";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { frontEndRedirect } from "utils/front-end-redirect";
import { serverSideRedirect } from "utils/server-side-redirect";

export type StrapiPost = {
  id?: string;
  attributes: {
    title: string;
    content: string;
  };
};

export type PostsPageProps = {
  posts?: StrapiPost[];
};

export default function PostsPage({ posts = [] }: PostsPageProps) {
  const { data: session, status } = useSession();

  if (!session && status !== "loading") return frontEndRedirect();

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || "ninguém"}: POSTS</h1>

      {posts.map((p) => (
        <p key={`post-${p.id}`}>
          <Link href={`/${p.id}`}>{p.attributes.title}</Link>
        </p>
      ))}
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) return serverSideRedirect(ctx);

  try {
    const { posts } = await gqlClient.request(GQL_QUERY_GET_POSTS, null, {
      Authorization: `Bearer ${session.acessToken}`,
    });

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

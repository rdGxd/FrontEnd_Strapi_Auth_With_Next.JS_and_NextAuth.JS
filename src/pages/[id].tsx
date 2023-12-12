import { FormPost, StrapiPost } from "components/FormPost";
import { Wrapper } from "components/Wrapper";
import { gqlClient } from "graphql/client";
import { GQL_MUTATION_UPDATE_POST } from "graphql/mutations/post";
import { GQL_QUERY_GET_POST } from "graphql/queries/post";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { frontEndRedirect } from "utils/front-end-redirect";
import { serverSideRedirect } from "utils/server-side-redirect";

export type PostPageProps = {
  posts: StrapiPost & {
    data: StrapiPost[];
  };
};

export default function PostPage({ posts }: PostPageProps) {
  const { data: session, status } = useSession();

  if (!session && status !== "loading") return frontEndRedirect();

  if (typeof window !== "undefined" && status === "loading") return null;

  if (!session) return <p>Você não está autenticado</p>;

  const handleSave = async ({ id, title, content }) => {
    try {
      await gqlClient.request(
        GQL_MUTATION_UPDATE_POST,
        {
          id,
          title,
          content,
        },
        {
          Authorization: `Bearer ${session.acessToken}`,
        },
      );
    } catch (error) {
      alert("Erro ao salvar o post");
    }
  };

  return (
    <Wrapper>
      <FormPost post={posts[0]} onSave={handleSave} />
    </Wrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) return serverSideRedirect(ctx);

  const { id } = ctx.params;

  try {
    const { posts }: PostPageProps = await gqlClient.request(
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

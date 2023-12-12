import { Wrapper } from "components/Wrapper";
import { gqlClient } from "graphql/client";
import { GQL_MUTATION_DELETE_POST } from "graphql/mutations/post";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { frontEndRedirect } from "utils/front-end-redirect";

export type StrapiPosts = {
  id?: string;
  attributes?: {
    title: string;
    content: string;
  };
};

export type PostsPagePropsTemplate = {
  posts?: StrapiPosts[];
};

export default function PostsPageTemplate({
  posts = [],
}: PostsPagePropsTemplate) {
  const { data: session, status } = useSession();
  const [statePosts, setStatePosts] = useState(posts);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStatePosts(posts);
  }, [posts]);

  if (!session && status !== "loading") return frontEndRedirect();

  if (typeof window !== "undefined" && status === "loading") return null;

  if (!session) return <p>Você não está autenticado</p>;

  const handleDelete = async (id: string) => {
    setDeleting(true);

    try {
      await gqlClient.request(
        GQL_MUTATION_DELETE_POST,
        {
          id,
        },
        {
          Authorization: `Bearer ${session.acessToken}`,
        },
      );

      setStatePosts((s) => s.filter((p) => p.id !== id));
    } catch (error) {
      alert("Não foi possível excluir este post");
    }

    setDeleting(false);
  };

  return (
    <Wrapper>
      <h1>Olá {session?.user?.name || "ninguém"}: POSTS</h1>

      {statePosts.map((p) => (
        <p key={`post-${p.id}`}>
          <Link href={`/${p.id}`}>{p.attributes.title}</Link> |{" "}
          <button onClick={() => handleDelete(p.id)} disabled={deleting}>
            Excluir
          </button>
        </p>
      ))}
    </Wrapper>
  );
}

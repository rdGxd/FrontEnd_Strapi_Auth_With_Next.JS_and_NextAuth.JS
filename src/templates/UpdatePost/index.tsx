import { FormPost, StrapiPost } from "components/FormPost";
import { Wrapper } from "components/Wrapper";
import { gqlClient } from "graphql/client";
import { GQL_MUTATION_UPDATE_POST } from "graphql/mutations/post";
import { useSession } from "next-auth/react";

export type UpdatePostTemplateProps = {
  posts: StrapiPost & {
    data: StrapiPost[];
  };
};

export function UpdatePostTemplate({ posts }: UpdatePostTemplateProps) {
  const { data: session } = useSession();

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
          Authorization: `Bearer ${session.accessToken}`,
        },
      );
    } catch (error) {
      alert("Erro ao salvar o post");
    }
  };

  if (!posts[0]) {
    return (
      <Wrapper>
        <p>Post não existe</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormPost post={posts[0]} onSave={handleSave} />
    </Wrapper>
  );
}

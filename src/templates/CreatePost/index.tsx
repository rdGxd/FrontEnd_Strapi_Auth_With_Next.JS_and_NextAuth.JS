import { FormPost } from "components/FormPost";
import { Wrapper } from "components/Wrapper";
import { gqlClient } from "graphql/client";
import { GQL_MUTATION_CREATE_POST } from "graphql/mutations/post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function CreatePostTemplate() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSave = async ({ title, content }) => {
    try {
      const response = await gqlClient.request(
        GQL_MUTATION_CREATE_POST,
        {
          title,
          content,
          publishedAt: new Date().toISOString(),
        },
        {
          Authorization: `Bearer ${session.accessToken}`,
        },
      );

      const {
        createPost: { data },
      } = response;

      if (data) {
        router.push(`/${data.id}`);
      }
    } catch (error) {
      alert("Erro ao criar o post");
    }
  };

  return (
    <Wrapper>
      <FormPost onSave={handleSave} />
    </Wrapper>
  );
}

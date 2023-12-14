import { Wrapper } from "components/Wrapper";
import { useSession } from "next-auth/react";

export default function OpenRoutePage() {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <h1>Essa rota é aberta</h1>

      {session ? (
        <p>Olá {session.user.name}</p>
      ) : (
        <p>Olá você ainda não fez login.</p>
      )}
    </Wrapper>
  );
}

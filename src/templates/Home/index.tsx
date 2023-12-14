import { useSession } from "next-auth/react";
import { Wrapper } from "../../components/Wrapper";

export const HomeTemplate = () => {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <h1>
        {session ? `Olá ${session.user.name}` : "Nenhum usuário conectado"}
      </h1>
    </Wrapper>
  );
};

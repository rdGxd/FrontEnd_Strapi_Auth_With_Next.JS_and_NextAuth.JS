import { Button } from "components/Button";
import { FormLogin } from "components/FormLogin";
import { Wrapper } from "components/Wrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    const redirect = router.query?.redirect || "/";

    if (!email || !password) {
      return setError("Preencha os campos corretamente");
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: redirect as string,
    });

    if (!response.ok) {
      return setError("Usuário ou senha inválidos");
    }

    window.location.href = response.url;
  };

  const handleLoginGoogle = async () => {
    const redirect = router.query?.redirect || "/";

    await signIn("google", { callbackUrl: redirect as string });
  };

  return (
    <Wrapper>
      <FormLogin onLogin={handleLogin} errorMessage={error} />
      <br />
      <Button onClick={handleLoginGoogle}>Login com o google</Button>
    </Wrapper>
  );
}

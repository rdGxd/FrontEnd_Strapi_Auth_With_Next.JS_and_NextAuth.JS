import { Email, Password } from "@styled-icons/material-outlined";
import { Button } from "components/Button";
import { TextInput } from "components/TextInput";
import { FormEvent, useState } from "react";
import * as Styled from "./styles";

export type FormLoginProps = {
  errorMessage?: string;
  onLogin?: (email: string, password: string) => Promise<void>;
};

export const FormLogin = ({ errorMessage, onLogin }: FormLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();

    if (onLogin) {
      await onLogin(email, password);
    }

    setLoading(false);
  };

  return (
    <Styled.Wrapper onSubmit={handleSubmit}>
      <TextInput
        name="user-identifier"
        label="Seu e-mail"
        onInputChange={(v) => setEmail(v)}
        value={email}
        icon={<Email />}
        type="email"
      />
      <TextInput
        name="user-password"
        label="Sua senha"
        type="password"
        onInputChange={(v) => setPassword(v)}
        value={password}
        icon={<Password />}
      />

      {!!errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}

      <Styled.ButtonWrapper>
        <Button disabled={loading}>{loading ? "Aguarde..." : "Entrar"}</Button>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};

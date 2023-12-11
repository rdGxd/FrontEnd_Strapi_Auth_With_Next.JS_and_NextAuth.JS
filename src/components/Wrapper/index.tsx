import { Menu } from "components/Menu";
import { ReactNode } from "react";
import * as Styled from "./styles";

export type WrapperProps = {
  children: ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <Styled.Wrapper>
      <Menu />
      {children}
    </Styled.Wrapper>
  );
}

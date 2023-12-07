import { ButtonHTMLAttributes, ReactNode } from "react";
import * as Styled from "./styles";

export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  color?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  disabled = false,
  onClick,
  icon,
  color = "primary",
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Styled.Button disabled={disabled} color={color} onClick={handleClick}>
      {children}
      {!!icon && icon}
    </Styled.Button>
  );
};

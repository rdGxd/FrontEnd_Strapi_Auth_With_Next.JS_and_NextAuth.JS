import { InputHTMLAttributes, ReactNode, useRef } from "react";
import * as Styled from "./styles";

export type TextInputProps = {
  label: string;
  name: string;
  type?: string;
  onInputChange?: (value: string) => void;
  disabled?: boolean;
  errorMessage?: string;
  $errorMessage?: string;
  value?: string;
  icon?: ReactNode;
  as?: "input" | "textarea";
  reference?: HTMLInputElement;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = ({
  type = "text",
  label,
  name,
  disabled = false,
  onInputChange,
  errorMessage = "",
  value = "",
  icon = "",
  as = "input",
  reference = null,
}: TextInputProps) => {
  const inputRef = useRef(reference);

  const handleChange = () => {
    const value = inputRef.current.value;

    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.InputWrapper $errorMessage={errorMessage}>
        <Styled.Input
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          ref={inputRef}
          onChange={handleChange}
          placeholder={label}
          $errorMessage={errorMessage}
          as={as}
          defaultValue={value}
        />

        <Styled.Label htmlFor={name} $element={as}>
          {label}
        </Styled.Label>
        {!!icon && as !== "textarea" && icon}
      </Styled.InputWrapper>
    </Styled.Wrapper>
  );
};

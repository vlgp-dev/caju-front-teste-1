import { forwardRef, type InputHTMLAttributes } from "react";

import * as S from "./styles";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { id, label, error, ...rest } = props;

  return (
    <S.Wrapper>
      {label && <label htmlFor={id}>{label}</label>}
      <S.Input ref={ref} id={id} $hasError={Boolean(error)} {...rest} />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Wrapper>
  );
});

export default TextField;

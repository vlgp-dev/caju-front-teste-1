import { type ButtonHTMLAttributes } from "react";

import * as S from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "lg";
  radius?: "sm" | "lg";
  appearance?: "success" | "danger" | "warning" | "default";
}

const Button = (props: ButtonProps) => {
  const { size, radius, appearance, ...rest } = props;

  return (
    <S.Button
      $size={size}
      $radius={radius}
      $appearance={appearance}
      {...rest}
    />
  );
};

export default Button;

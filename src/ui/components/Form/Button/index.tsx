import { ComponentProps, PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { appendClassNames } from "@utils/className";

interface ButtonProps extends ComponentProps<"button"> {
  color?: "primary" | "secondary";
  className?: string;
}

function Button({
  color = "primary",
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const buttonColorStyle =
    color === "secondary" ? styles.secondary : styles.primary;
  return (
    <button
      className={appendClassNames([
        styles.button,
        buttonColorStyle,
        className!,
      ])}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;

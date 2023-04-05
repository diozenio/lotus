import { appendClassNames } from "@utils/className";
import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

interface DescriptionProps {
  className?: string;
  size?: "sm" | "lg";
}

function Description({
  children,
  className,
  size = "lg",
}: PropsWithChildren<DescriptionProps>) {
  const textSize = size === "sm" ? styles.sm : styles.lg;

  return (
    <p className={appendClassNames([styles.description, textSize, className!])}>
      {children}
    </p>
  );
}

export default Description;

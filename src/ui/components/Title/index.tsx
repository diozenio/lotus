import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { appendClassNames } from "@utils/className";

type TitleSizes = "sm" | "md" | "lg" | "xl";

interface TitleProps {
  className?: string;
  size?: TitleSizes;
}

function Title({
  children,
  className,
  size = "lg",
}: PropsWithChildren<TitleProps>) {
  let textSize;
  switch (size) {
    case "sm":
      textSize = styles.sm;
      break;
    case "md":
      textSize = styles.md;
      break;
    case "lg":
      textSize = styles.lg;
      break;
    case "xl":
      textSize = styles.xl;
      break;
  }

  const style = appendClassNames([styles.title, textSize, className!]);

  return <h1 className={style}>{children}</h1>;
}

export default Title;

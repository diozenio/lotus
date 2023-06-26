import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";
import { appendClassNames } from "@utils/className";

interface CoverProps {
  className?: string;
}

export default function Cover({
  children,
  className,
}: PropsWithChildren<CoverProps>) {
  return (
    <div className={appendClassNames(styles.container, className || "")}>
      {children}
    </div>
  );
}

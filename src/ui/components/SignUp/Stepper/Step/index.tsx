import { Description, Title } from "@components/index";
import { appendClassNames } from "@utils/className";
import styles from "./styles.module.scss";

interface StepProps {
  title: string;
  description: string;
  stepIndex: number;
  filled: boolean;
}

export default function Step({
  title,
  description,
  stepIndex,
  filled,
}: StepProps) {
  const indexContainerStyle = appendClassNames(styles.indexContainer, {
    [styles.filled]: filled,
  });

  return (
    <div className={styles.stepContainer}>
      <div className={indexContainerStyle}>
        <Title size="lg">{stepIndex}</Title>
      </div>
      <div>
        <Title size="sm" className={styles.stepText}>
          {title}
        </Title>
        <Description size="sm" className={styles.stepText}>
          {description}
        </Description>
      </div>
    </div>
  );
}

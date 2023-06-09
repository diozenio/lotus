import { appendClassNames } from "@utils/className";
import styles from "./styles.module.scss";
import { StepperProps } from "../IStepperProps";

function HorizontalStepper({ currentPage, className }: StepperProps) {
  const getStepContainerClass = (stepNumber: number) => {
    return appendClassNames(styles.indexContainer, {
      [styles.filled]: currentPage >= stepNumber,
    });
  };

  const getDividerClass = (stepNumber: number) => {
    return appendClassNames(styles.dashedDivider, {
      [styles.filled]: currentPage >= stepNumber,
    });
  };

  return (
    <div className={appendClassNames(styles.container, className!)}>
      <div className={appendClassNames(styles.indexContainer, styles.filled)}>
        1
      </div>
      <div className={getDividerClass(1)}></div>
      <div className={getStepContainerClass(1)}>2</div>
      <div className={getDividerClass(2)}></div>
      <div className={getStepContainerClass(2)}>3</div>
    </div>
  );
}

export default HorizontalStepper;

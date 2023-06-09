import { appendClassNames } from "@utils/className";
import { StepperProps } from "../IStepperProps";
import Step from "../Step";
import styles from "./styles.module.scss";

function VerticalStepper({ currentPage, className }: StepperProps) {
  const getDividerClass = (stepNumber: number) => {
    return appendClassNames({
      [styles.filledDivider]: currentPage >= stepNumber,
      [styles.dashedDivider]: currentPage < stepNumber,
    });
  };

  return (
    <div className={className}>
      <Step
        title="Dados da conta"
        description="Preencha os campos com os dados da conta"
        stepIndex={1}
        filled={currentPage >= 0}
      />
      <div className={getDividerClass(1)}></div>
      <Step
        title="Personalização"
        description="Personalize sua conta com uma foto de perfil"
        stepIndex={2}
        filled={currentPage >= 1}
      />
      <div className={getDividerClass(2)}></div>
      <Step
        title="Verificação de conta"
        description="Confirme o e-mail cadastrado"
        stepIndex={3}
        filled={currentPage >= 2}
      />
    </div>
  );
}

export default VerticalStepper;

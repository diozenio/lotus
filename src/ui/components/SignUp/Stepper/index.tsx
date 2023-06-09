import HorizontalStepper from "./HorizontalStepper";
import { StepperProps } from "./IStepperProps";
import VerticalStepper from "./VerticalStepper";

function Stepper({
  stepperProps,
  horizontal,
}: {
  stepperProps: StepperProps;
  horizontal?: boolean;
}) {
  const StepperComponent = horizontal ? HorizontalStepper : VerticalStepper;

  return (
    <StepperComponent
      currentPage={stepperProps.currentPage}
      className={stepperProps.className}
    />
  );
}

export default Stepper;

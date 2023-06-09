import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import Description from "@components/Description";
import { appendClassNames } from "@utils/className";
import { TfiReload } from "react-icons/tfi";

interface VerificationCodeProps {
  onResendCode: () => void;
  className?: string;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({
  onResendCode,
  className,
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleCodeChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    const newCode = [...code];
    newCode[index] = sanitizedValue;
    setCode(newCode);

    if (sanitizedValue && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!sanitizedValue && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter" && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const containerStyles = appendClassNames(styles.container, className!);

  return (
    <div className={containerStyles}>
      <Description size="sm" className={styles.infoText}>
        Digite o código de verificação enviado para o seu e-mail
      </Description>
      <a onClick={onResendCode} className={styles.resendCode}>
        <TfiReload size={18} style={{ marginBottom: 1 }} />
        Reenviar código
      </a>
      <div className={styles.inputGroup}>
        {code.map((digit, index) => (
          <input
            key={index}
            name={`digit-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            inputMode="numeric"
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^0-9]/g,
                ""
              );
            }}
            className={styles.input}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </div>
    </div>
  );
};

export default VerificationCode;

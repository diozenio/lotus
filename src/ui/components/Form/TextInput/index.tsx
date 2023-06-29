import React, { forwardRef, useState } from "react";
import styles from "./styles.module.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputType = "text" | "password" | "email";

interface InputProps {
  type?: InputType;
  label?: string;
  icon?: React.ReactNode;
  helperText?: string;
  error?: boolean;
  htmlInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = "text", label, icon, helperText, error, htmlInputProps, ...rest },
    ref
  ) => {
    const [hiddenText, setHiddenText] = useState<boolean>(true);

    const changeTextVisibility = () => {
      setHiddenText(!hiddenText);
    };

    return (
      <label className={styles.label}>
        {label}
        <div
          className={styles.inputWrapper}
          style={{ borderColor: error ? "#b70731" : "transparent" }}
        >
          {icon}
          <input
            ref={ref}
            type={!hiddenText ? "text" : type}
            className={styles.input}
            {...htmlInputProps}
            {...rest}
          />
          {type === "password" &&
            (hiddenText ? (
              <FiEyeOff
                style={{ cursor: "pointer" }}
                onClick={changeTextVisibility}
              />
            ) : (
              <FiEye
                style={{ cursor: "pointer" }}
                onClick={changeTextVisibility}
              />
            ))}
        </div>
        <p className={styles.errorMessage}>{helperText}</p>
      </label>
    );
  }
);

export default TextInput;

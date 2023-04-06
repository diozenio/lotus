import { useState } from "react";
import styles from "./styles.module.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputType = "text" | "password" | "email";

interface InputProps {
  type?: InputType;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  autoFocus?: boolean;
}

function TextInput({
  type = "text",
  label,
  placeholder,
  icon,
  autoFocus,
}: InputProps) {
  const [hiddenText, setHiddenText] = useState<boolean>(false);

  const changeTextVisibility = () => {
    setHiddenText(!hiddenText);
  };

  return (
    <label className={styles.label}>
      {label}
      <div className={styles.inputWrapper}>
        {icon}
        <input
          type={hiddenText ? "text" : type}
          className={styles.input}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {type === "password" &&
          (hiddenText ? (
            <FiEye onClick={changeTextVisibility} />
          ) : (
            <FiEyeOff onClick={changeTextVisibility} />
          ))}
      </div>
    </label>
  );
}

export default TextInput;

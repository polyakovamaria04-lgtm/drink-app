import styles from "../components/FormStyles.module.scss";
import EyeSvg from "@/assets/svg/form-icons/visible.svg?react";
import EyeOffSvg from "@/assets/svg/form-icons/nonvisible.svg?react";
import ErrorIcon from "@/assets/svg/form-icons/exclamationMark.svg?react";
import SuccessIcon from "@/assets/svg/form-icons/checkmark.svg?react";
import { useState } from "react";

export const AuthInput = ({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  isCorrect,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  const [isFocused, setIsFocused] = useState(false);
  let actualType = type;

  if (type === "date") {
    actualType = isFocused || value ? "date" : "text";
  } else if (isPasswordType && showPassword) {
    actualType = "text";
  }
  const inputClass = styles.inputField;

  const wrapperClassName = `
    ${styles.inputWrapper} 
    ${error ? styles.fieldError : ""} 
    ${isCorrect && !error ? styles.fieldCorrect : ""}
  `.trim();

  const getSuccessMessage = () => {
    if (id === "email") return "This is a CORRECT email";
    if (id === "password") return "This is a CORRECT password";
    if (id === "name") return "This is a CORRECT name";
    if (id === "birthdate") return "This is a CORRECT birthdate";
    return "Field is correct";
  };

  return (
    <div className={styles.inputMainFieldContainer}>
      <div className={wrapperClassName}>
        <input
          id={id}
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          className={inputClass}
          {...props}
        />

        <div className={styles.iconRightArea}>
          {!isPasswordType && error && (
            <ErrorIcon className={`${styles.inputIcon} ${styles.iconError}`} />
          )}

          {!isPasswordType && isCorrect && !error && (
            <SuccessIcon
              className={`${styles.inputIcon} ${styles.iconSucces}`}
            />
          )}

          {isPasswordType && value && (
            <button
              type="button"
              className={styles.passwordToggleBtn}
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeSvg className={`${styles.inputIcon} ${styles.iconEye}`} />
              ) : (
                <EyeOffSvg
                  className={`${styles.inputIcon} ${styles.iconEye}`}
                />
              )}
            </button>
          )}
        </div>
      </div>
      <div className={styles.hintContainer}>
        {error ? (
          <span className={styles.errorHint}>{error}</span>
        ) : isCorrect ? (
          <span className={styles.successHint}>{getSuccessMessage()}</span>
        ) : (
          <span className={styles.errorHint} style={{ visibility: "hidden" }}>
            &nbsp;
          </span>
        )}
      </div>
    </div>
  );
};

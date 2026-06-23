import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../components/FormStyles.module.scss";
import { AuthButton } from "./AuthButton";
import { AuthInput } from "./AuthInput";
import { BirthdateInput } from "./BirthdateInput";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);

  const [birthdate, setBirthdate] = useState(null);
  const [birthdateError, setBirthdateError] = useState("");
  const [isBirthdateValid, setIsBirthdateValid] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim().length >= 2) {
      setIsNameValid(true);
      setNameError("");
    } else {
      setIsNameValid(false);
    }
  };

  const handleNameBlur = () => {
    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
    }
  };

  const handleBirthdateChange = (date) => {
    setBirthdate(date);
    if (date) {
      setIsBirthdateValid(true);
      setBirthdateError("");
    } else {
      setIsBirthdateValid(false);
    }
  };

  const handleBirthdateBlur = () => {
    if (!birthdate) {
      setBirthdateError("Please select your birthdate");
    }
  };

  const validateEmailFormat = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (validateEmailFormat(value)) {
      setIsEmailValid(true);
      setEmailError("");
    } else {
      setIsEmailValid(false);
    }
  };

  const handleEmailBlur = () => {
    if (email.length > 0 && !validateEmailFormat(email)) {
      setEmailError("This is an ERROR email");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length >= 6) {
      setIsPasswordValid(true);
      setPasswordError("");
    } else {
      setIsPasswordValid(false);
    }
  };

  const handlePasswordBlur = () => {
    if (password.length > 0 && password.length < 6) {
      setPasswordError("This is an ERROR password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    setNameError("");
    setBirthdateError("");
    setEmailError("");
    setPasswordError("");

    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      hasError = true;
    }

    if (!birthdate) {
      setBirthdateError("Please select your birthdate");
      hasError = true;
    }

    if (!validateEmailFormat(email)) {
      setEmailError("This is an ERROR email");
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError("This is an ERROR password");
      hasError = true;
    }

    if (hasError) return;

    try {
      const userData = { name, birthdate, email, password };

      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/auth/register",
        userData,
      );

      console.log("Registration Success! Server response:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);

      if (error.response && error.response.data) {
        const serverMessage = error.response.data.message || "";

        if (
          serverMessage.toLowerCase().includes("email") ||
          serverMessage.toLowerCase().includes("exists")
        ) {
          setEmailError(serverMessage);
        } else if (serverMessage.toLowerCase().includes("password")) {
          setPasswordError(serverMessage);
        } else if (serverMessage.toLowerCase().includes("name")) {
          setNameError(serverMessage);
        } else if (serverMessage.toLowerCase().includes("fields")) {
          setEmailError(serverMessage);
        } else {
          setEmailError(serverMessage || "Registration failed");
        }
      } else {
        setEmailError("Server is not responding. Please check your backend.");
      }
    }
  };

  return (
    <form
      className={styles.authForm}
      noValidate
      onSubmit={handleSubmit}
      autoComplete="off">
      <h1 className={styles.formTitle}>Sign Up</h1>

      <div className={styles.inputFormWrapper}>
        <AuthInput
          id="name"
          type="text"
          placeholder="Name"
          autoFocus
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          error={nameError}
          isCorrect={isNameValid}
        />

        <BirthdateInput
          id="birthdate"
          value={birthdate}
          onChange={handleBirthdateChange}
          onBlur={handleBirthdateBlur}
          error={birthdateError}
          isCorrect={isBirthdateValid}
          placeholder="dd/mm/yyyy"
        />

        <AuthInput
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
          isCorrect={isEmailValid}
          autoComplete="new-email"
        />

        <AuthInput
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordError}
          isCorrect={isPasswordValid}
          autoComplete="new-password"
        />
      </div>

      <AuthButton type="submit">Sign Up</AuthButton>

      <Link to="/login" className={styles.navigateButton}>
        Sign In
      </Link>
    </form>
  );
};

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import styles from "../components/FormStyles.module.scss";
import { Link } from "react-router-dom";

export const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  const validateEmailFormat = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.trim() === "") {
      setIsEmailValid(false);
      setEmailError("");
      return;
    }

    if (validateEmailFormat(value)) {
      setIsEmailValid(true);
      setEmailError("");
    } else {
      setIsEmailValid(false);
    }
  };

  const handleEmailBlur = () => {
    if (email.trim() === "") {
      setEmailError("");
      return;
    }

    if (!validateEmailFormat(email)) {
      setEmailError("This is an ERROR email");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.trim() === "") {
      setIsPasswordValid(false);
      setPasswordError("");
      return;
    }

    if (value.length >= 6) {
      setIsPasswordValid(true);
      setPasswordError("");
    } else {
      setIsPasswordValid(false);
    }
  };

  const handlePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError("");
      return;
    }

    if (password.length < 6) {
      setPasswordError("This is an ERROR password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    setEmailError("");
    setPasswordError("");

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
      const loginData = { email, password };

      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/auth/login",
        loginData,
      );

      console.log(
        "The backend has successfully authenticated the user! Response:",
        response.data,
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      setIsAuthenticated(true);

      navigate("/home");
    } catch (error) {
      console.error("Error while attempting to log in:", error);

      if (error.response && error.response.data) {
        const serverMessage =
          error.response.data.message || "Authorization error";
        if (serverMessage.toLowerCase().includes("email")) {
          setEmailError(serverMessage);
        } else {
          setPasswordError(serverMessage);
        }
      } else {
        setEmailError(
          "The server is not responding. Please check if the backend is running!",
        );
      }
    }
  };

  return (
    <form
      className={styles.authForm}
      noValidate
      onSubmit={handleSubmit}
      autoComplete="off">
      <h1 className={styles.formTitle}>Sign In</h1>

      <div className={styles.inputFormWrapper}>
        <AuthInput
          id="email"
          type="email"
          placeholder="Email"
          autoFocus
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

      <AuthButton type="submit">Sign In</AuthButton>

      <Link to="/register" className={styles.navigateButton}>
        Sign Up
      </Link>
    </form>
  );
};

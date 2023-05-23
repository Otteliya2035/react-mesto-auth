import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../utils/authApi";
import InfoTooltip from "../Components/InfoTooltip";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Вызов API для проверки учетных данных и выполнения входа
    authApi
      .login(email, password)
      .then(() => {
        // Успешный вход
        setIsLoginSuccessful(true);
        setShowInfoTooltip(true);
        //  перенаправление на другую страницу
        navigate("/main", { replace: true });
      })
      .catch((error) => {
        // Неудачный вход
        setIsLoginSuccessful(false);
        setShowInfoTooltip(true);
        console.log("Ошибка входа:", error);
      });
  };

  return (
    <div className="login">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label>
          <input
            className="auth__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <label>
          <input
            className="auth__input"
            type="password"
            value={password}
            placeholder="Пароль"
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
      <InfoTooltip
        isOpen={showInfoTooltip}
        onClose={() => setShowInfoTooltip(false)}
        isSuccess={isLoginSuccessful}
      />
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../utils/authApi";
import InfoTooltip from "../Components/InfoTooltip";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    authApi
      .register(email, password)
      .then(() => {
        setRegistrationSuccessful(true);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("Ошибка регистрации:", error);
      });
  };

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="register">
      <h2 className="auth__title">Регистрация</h2>
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
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
        <div className="auth__signin">
          <Link to="/sign-in">
            <p className="auth__login-link"> Уже зарегистрированы? Войти</p>
          </Link>
        </div>
      </form>
      {isRegistrationSuccessful && (
        <InfoTooltip
          isOpen={true}
          onClose={() => setRegistrationSuccessful(false)}
          isSuccess={true}
        />
      )}
    </div>
  );
}

export default Register;


import React, { useState } from "react";
import { Link} from "react-router-dom";
import authApi from "../utils/authApi";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Выполняем регистрацию
    authApi
      .register(email, password)
      .then(() => {
        // Регистрация прошла успешно
        console.log("Регистрация успешна!");
        // Очищаем поля формы
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // Обработка ошибки регистрации
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
        <Link to="/sign-in"><p className="auth__login-link">  Уже зарегистрированы? Войти</p>

        </Link>
      </div>
    </form>

    </div>
  );
}

export default Register;
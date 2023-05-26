import React, { useState } from "react";
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
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
    </div>
  );
};

export default Login;

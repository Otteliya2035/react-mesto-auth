import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Логотип.svg";
import "../index.css";

function Header({ isLoggedIn, onSignOut, headerEmail }) {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Логотип" className="header__logo" />
      </Link>

      {isLoggedIn ? (
        <div className="header__container">
          <p className="header__email">{headerEmail}</p>
          <Link to="/" className="header__link" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;

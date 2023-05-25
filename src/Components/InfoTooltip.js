import React from "react";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__content">
          <div className="popup__icon-container">
            <div
              className={`popup__icon ${
                isSuccess ? "popup__icon_success" : "popup__icon_error"
              }`}
            ></div>
          </div>
          <h2 className="popup__title popup__title-auth">
            {isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;

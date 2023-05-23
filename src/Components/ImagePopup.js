import React from "react";

function ImagePopup(props) {
  const selectedCard = props.card;
  return (
    <div
      className={`popup popup_big-img ${selectedCard ? "popup_opened" : ""}`}
    >
      <div className=" popup__figure-container">
        <button
          className="popup__close popup__close_img"
          type="button"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name : ""}
            className="popup__img"
          />
          <figcaption className="popup__caption">
            {props.card ? props.card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;

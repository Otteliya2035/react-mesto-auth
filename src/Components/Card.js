import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLikedBefore = props.card.likes.some((i) => i._id === currentUser._id);
  const [liked, setLiked] = useState(isLikedBefore);
  const [likesCount, setLikesCount] = useState(props.card.likes.length);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <figure className="element__container">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="element__img"
          onClick={handleClick}
        />
        {isOwn && (
          <button
            type="button"
            className="element__delete"
            onClick={handleDeleteClick}
          ></button>
        )}
        <figcaption className="element__info">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like-container">
            <button
              type="button"
              className={`element__like-btn ${
                liked ? "element__like-btn_active" : ""
              }`}
              onClick={handleCardLike}
            ></button>
            <span className="element__like-count">{likesCount}</span>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;

import React, { useState, useContext } from "react";
import PopupWithForm from "../Components/PopupWidthForm";
import api from "../utils/api";
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="popup_new-place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText="Создать"
    >
      <form
        className="popup__form popup__form-place"
        id="form"
        name="form"
        noValidate
      >
        <input
          className="popup__field popup__field_input_new-place"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          required
          placeholder="Название"
          id="name"
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__input-error name-error"> </span>
        <input
          className="popup__field popup__field_input_link-pic"
          name="link"
          type="url"
          required
          placeholder="Ссылка на картинку"
          id="link"
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__input-error link-error"> </span>
      </form>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

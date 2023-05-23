import React, { useState, useEffect } from "react";
import PopupWithForm from "../Components/PopupWidthForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      user={currentUser}
      btnText="Сохранить"
    >
      <form
        className="popup__form popup__form-profile"
        name="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="popup__field popup__field_input_username"
          name="name"
          type="text"
          minLength="2"
          maxLength="40"
          required
          placeholder="Имя"
          id="profile"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error profile-error"></span>
        <input
          className="popup__field popup__field_input_userjob"
          name="about"
          type="text"
          minLength="2"
          maxLength="200"
          required
          placeholder="О себе"
          id="job"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error job-error"></span>
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

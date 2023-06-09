function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          className="popup__form"
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button type="submit" className="popup__button">
            {props.btnText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;

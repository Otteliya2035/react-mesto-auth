import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "../Components/Main";
import Footer from "./Footer";
import ImagePopup from "../Components/ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "../Components/EditProfilePopup";
import EditAvatarPopup from "../Components/EditAvatarPopup";
import AddPlacePopup from "../Components/AddPlacePopup";
import Register from "../Components/Register";
import Login from "../Components/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import InfoTooltip from "../Components/InfoTooltip";
import authApi from "../utils/authApi";
import { useNavigate } from "react-router-dom";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [headerEmail, setHeaderEmail] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authApi
        .checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setHeaderEmail(data.email);
        })
        .catch((error) => {
          console.log(error);
          setIsLoggedIn(false);
          setHeaderEmail("");
        });
    }

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, description: about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);

  const showRegistrationInfo = (isSuccess) => {
    setIsRegistrationSuccessful(isSuccess);
    setShowInfoTooltip(true);
  };



  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(error));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => console.log(error));
    } else {
      api
        .addLikeCard(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? { ...newCard } : c))
          );
        })
        .catch((error) => console.log(error));
    }
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setShowInfoTooltip(false);
    setSelectedCard(null);
  }
  function handleRegister(email, password) {
    authApi
      .register(email, password)
      .then(() => {
        showRegistrationInfo(true);
        setIsLoggedIn(true);
        setHeaderEmail(email);
        navigate("/");
      })
      .catch(() => {
        showRegistrationInfo(false);
        setShowInfoTooltip(true);
      });
  }

  const handleLogin = (email, password) => {
    authApi
      .login(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setHeaderEmail(email);
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
        setHeaderEmail("");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setHeaderEmail("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onSignOut={handleLogout}
          headerEmail={headerEmail}
        />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                handleLogout={handleLogout}
                setHeaderEmail={setHeaderEmail}
                onLogin={handleLogin}
              />
            }
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} showRegistrationInfo={showRegistrationInfo} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
              />
            }
          />
        </Routes>
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
       {showInfoTooltip && (
          <InfoTooltip
            isOpen={showInfoTooltip}
            onClose={() => setShowInfoTooltip(false)}
            isSuccess={isRegistrationSuccessful}
          />
        )}

        <div className="popup popup_delete-card">
          <div className="popup__container">
            <button className="popup__close" type="button"></button>
            <form className="popup__form" name="form" novalidate>
              <h2 className="popup__title">Вы уверены?</h2>
              <button className="popup__button popup__yes-button" type="submit">
                Да
              </button>
            </form>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;

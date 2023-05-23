class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers }).then(
      (res) => this._checkResponse(res)
    );
  }

  setUserInfo({ name, description }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then((res) => this._checkResponse(res));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers }).then((res) =>
      this._checkResponse(res)
    );
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  addLikeCard(_id) {
    return fetch(`${this._url}/cards/likes/${_id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  deleteLikeCard(_id) {
    return fetch(`${this._url}/cards/likes/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "6993a727-96ba-4996-a1f3-e62c6fb54cfd",
    "Content-Type": "application/json",
  },
});

export default api;

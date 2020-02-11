import axios from "axios";

import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEPOGGCl0EVoKH2YabDOp--e6wgkQYX0s";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEPOGGCl0EVoKH2YabDOp--e6wgkQYX0s";
    }

    const response = await axios.post(url, authData);
    const data = response.data;

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(authLogout(data.expiresIn));
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  };
}

export function authLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      // TODO: Рассчитать относитльно expirationDate
      // const expirationDate = localStorage.getItem("expirationDate");
      // if (expirationDate <= new Date()) {
      //   dispatch(logout());
      // } else {
      //   dispatch(authSuccess(token));
      //   dispatch(authLogout((expirationDate - new Date()) / 1000));
      // }
    }
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT
  };
}

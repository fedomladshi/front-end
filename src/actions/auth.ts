import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types/register";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types/login";
import { LOGOUT } from "./types/logout";
import axios from "axios";
import {setAuthToken, deleteAuthToken} from "../utils/setAuthToken";

//Login User
export const loginUser = (data: any) => async (dispatch: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { email, password } = data;
  const body = { email, password };

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data;
    dispatch(setAlert(errors, "danger"));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Load User
export const loadUser = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = (data: any) => async (dispatch: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { name, email, password } = data;
  const body = { name, email, password };

  try {
    const res = await axios.post("/api/users", body, config);
    console.log('жопа1')
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    console.log('жопа2')
  } catch (error) {
    const errors = error.response.data;
    dispatch(setAlert(errors, "danger"));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Logout
export const logout = () => (dispatch: any) => {
  dispatch({ type: LOGOUT });
};

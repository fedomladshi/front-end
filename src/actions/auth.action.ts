import {
  LOAD_USER,
  EXIT_USER,
  UPDATE_STATUS,
  UPDATE_AVATAR,
  DELETE_AVATAR,
} from "./types/user";
import axios from "axios";
import { setAuthToken } from "../utils/setAuthToken";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../store";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types/login";
import { LOGOUT } from "./types/logout";
import { LoginFormDataType, UserType } from "../../appTypes&Interfaces";
import { setAlert } from "./alert";
import { Dispatch } from "redux";
import { REGISTER } from "./types/register";

type loginSuccessActionType = {
  type: typeof LOGIN_SUCCESS;
  payload: string;
};

type addUserActionType = {
  type: typeof LOAD_USER;
  payload: UserType;
};

type loginFailActionType = {
  type: typeof LOGIN_FAIL;
};
type registerActionType = {
  type: typeof REGISTER;
  payload: boolean;
};

type userLoadedActionType = {
  type: typeof USER_LOADED;
  payload: UserType;
};

type authErrorActionType = {
  type: typeof AUTH_ERROR;
};

type logoutActionType = {
  type: typeof LOGOUT;
};
type exitUserActionType = {
  type: typeof EXIT_USER;
};
type updateUserStatusType = {
  type: typeof UPDATE_STATUS;
  payload: UserType;
};

type updateUserAvatarType = {
  type: typeof UPDATE_AVATAR;
  payload: string;
};

type deleteUserAvatarType = {
  type: typeof DELETE_AVATAR;
  payload: string;
};

export type ActionsTypes =
  | loginSuccessActionType
  | loginFailActionType
  | userLoadedActionType
  | authErrorActionType
  | registerActionType
  | logoutActionType
  | exitUserActionType
  | addUserActionType
  | updateUserStatusType
  | updateUserAvatarType
  | deleteUserAvatarType;

export const loginUser = (
  data: LoginFormDataType
): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (
  dispatch
) => {
  const { email, password } = data;
  const body = { email, password };

  try {
    const res = await axios.post("/api/auth/login", body);
    localStorage.setItem("token", res.data.token);
    dispatch({
      type: LOAD_USER,
      payload: res.data.user,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
  } catch (error) {
    const errors = error.response.data;
    dispatch(setAlert(errors, "danger"));

    localStorage.removeItem("token");

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    localStorage.removeItem("token");
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => (dispatch: any) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
  dispatch({ type: EXIT_USER });
};

export const register = (payload: boolean) => (dispatch: any) => {
  dispatch({ type: REGISTER, payload });
};

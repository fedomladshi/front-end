import { InferActionsTypes } from "./../reducers/index";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "..";

import * as lgnTs from "./types/login.types";
import { LoginFormDataType, UserType } from "../../../appTypes&Interfaces";
import { setAlert } from "./alert.action";
import { REGISTER } from "./types/register.types";

export const authActions = {
  loginSuccessAC: (payload: string) =>
    ({ type: lgnTs.LOGIN_SUCCESS, payload } as const),
  loginFailAC: () => ({ type: lgnTs.LOGIN_FAIL } as const),
  authErrorAC: () => ({ type: lgnTs.AUTH_ERROR } as const),
  logoutAC: () => ({ type: lgnTs.LOGOUT } as const),
  registerAC: (payload: boolean) => ({ type: REGISTER, payload } as const),
  userLoadedAC: () => ({ type: lgnTs.USER_LOADED } as const),
};

type ThunkActionType<T> = ThunkAction<
  Promise<T>,
  AppStateType,
  unknown,
  InferActionsTypes<typeof authActions>
>;

export const loginUser = (
  data: LoginFormDataType
): ThunkActionType<UserType> => async (dispatch) => {
  const { email, password } = data;
  const body = { email, password };

  try {
    const res = await axios.post("/api/auth/login", body);
    await localStorage.setItem("token", res.data.token);

    dispatch(authActions.loginSuccessAC(res.data.token));

    return res.data.user;
  } catch (error) {
    const errors = error.response.data;
    dispatch(setAlert(errors, "danger"));

    localStorage.removeItem("token");

    dispatch(authActions.loginFailAC());
  }
};

export const loadUser = (): ThunkActionType<any> => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth");
    dispatch(authActions.userLoadedAC());
    return res.data;
  } catch (error) {
    localStorage.removeItem("token");
    dispatch(authActions.authErrorAC());
  }
};

export const logout = (): ThunkActionType<void> => async (dispatch) => {
  await localStorage.removeItem("token");
  dispatch(authActions.logoutAC());
};

export const register = (payload: boolean): ThunkActionType<void> => async (
  dispatch
) => {
  dispatch(authActions.registerAC(payload));
};

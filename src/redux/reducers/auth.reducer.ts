import { AuthState } from "./../../../appTypes&Interfaces";
import { Reducer } from "redux";
import { InferActionsTypes } from "./index";
import * as t from "../actions/types/login.types";
import { REGISTER } from "../actions/types/register.types";
import { authActions } from "../actions/auth.action";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  registrationMessage: false,
  loading: false,
};

type ActionsTypes = InferActionsTypes<typeof authActions>;

const reducer: Reducer<AuthState, ActionsTypes> = (
  state = initialState,
  action: ActionsTypes
): AuthState => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registrationMessage: action.payload,
      };
    case t.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case t.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case t.LOGIN_FAIL:
    case t.LOGOUT:
    case t.AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../actions/types/login";
import { LOGOUT } from "../actions/types/logout";
import { ActionsTypes } from "../actions/auth.action";
import { REGISTER } from "../actions/types/register";

interface IInitialState {
  token: string | null;
  isAuthenticated: any;
  registrationMessage: boolean;
  loading: boolean;
}
const initialState: IInitialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  registrationMessage: false,
  loading: false,
};

export default function (state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registrationMessage: action.payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

import {
  UPDATE_STATUS,
  UPDATE_AVATAR,
  DELETE_AVATAR,
} from "./../actions/types/user";
import { LOAD_USER, EXIT_USER } from "../actions/types/user";
import { USER_LOADED } from "../actions/types/login";
import { ActionsTypes } from "../actions/auth.action";

type InitialStateType = {};
const initialState: InitialStateType = {};

export default function (state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    case UPDATE_STATUS:
      return {
        ...action.payload,
      };
    case USER_LOADED:
      return {
        ...action.payload,
      };
    case LOAD_USER:
      return {
        ...action.payload,
      };
    case DELETE_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    case EXIT_USER:
      return initialState;
    default:
      return state;
  }
}

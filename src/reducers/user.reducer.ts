import { UPDATE_STATUS } from './../actions/types/user';
import { LOAD_USER, EXIT_USER } from "../actions/types/user";
import { USER_LOADED } from "../actions/types/login";
import { ActionsTypes } from "../actions/auth.action";

type InitialStateType = {};
const initialState: InitialStateType = {};

export default function (state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case UPDATE_STATUS:
      return {
        ...action.payload
      }
    case USER_LOADED:
      return {
        ...action.payload,
      };
    case LOAD_USER:
      return {
        ...action.payload,
      };
    case EXIT_USER:
      return {};
    default:
      return state;
  }
}

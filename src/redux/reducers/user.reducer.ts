import { UserType } from "./../../../appTypes&Interfaces";
import { Reducer } from "react";
import { InferActionsTypes } from "./index";
import * as usrTs from "../actions/types/user.types";
import { userActions } from "../actions/user.action";

const initialState: UserType = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  gender: "",
  relationship: "",
  hometown: "",
  createdAt: "",
  status: "",
  friends: [],
};

type ActionsTypes = InferActionsTypes<typeof userActions>;

const reducer: Reducer<UserType, ActionsTypes> = (
  state = initialState,
  action: ActionsTypes
): UserType => {
  switch (action.type) {
    case usrTs.REMOVE_FROM_FRIENDS:
      return {
        ...state,
        friends: [...action.payload],
      };
    case usrTs.ADD_TO_FRIENDS:
      return {
        ...state,
        friends: [...action.payload],
      };
    case usrTs.EDIT_USER:
      return {
        ...action.payload,
      };
    case usrTs.UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    case usrTs.UPDATE_STATUS:
      return {
        ...action.payload,
      };
    case usrTs.USER_LOADED:
      return {
        ...action.payload,
      };
    case usrTs.LOAD_USER:
      return {
        ...action.payload,
      };
    case usrTs.DELETE_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    case usrTs.EXIT_USER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;

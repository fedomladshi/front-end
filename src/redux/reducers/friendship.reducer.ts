import { FriendshipType } from "./../../../appTypes&Interfaces";
import { Reducer } from "react";
import { InferActionsTypes } from "./index";
import { friendshipActions } from "../actions/friendship.action";
import * as friendShipTs from "../actions/types/friendship.types";

const initialState: Array<FriendshipType> = [
  {
    _id: "",
    requester: {
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
    },
    recipient: {
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
    },
    status: "",
  },
];

type ActionsTypes = InferActionsTypes<typeof friendshipActions>;

const reducer: Reducer<Array<FriendshipType>, ActionsTypes> = (
  state = initialState,
  action: ActionsTypes
): Array<FriendshipType> => {
  switch (action.type) {
    case friendShipTs.CREATE_FRIENDSHIP:
    case friendShipTs.GET_ALL_FRIENDSHIPS:
      return [...action.payload];
    default:
      return state;
  }
};

export default reducer;

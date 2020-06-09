import { setAlert } from "./alert.action";
import { FriendshipType } from "./../../../appTypes&Interfaces";
import { InferActionsTypes } from "./../reducers/index";
import * as friendShipTs from "./types/friendship.types";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "..";

export const friendshipActions = {
  createFriendshipAC: (payload: Array<FriendshipType>) =>
    ({ type: friendShipTs.CREATE_FRIENDSHIP, payload } as const),
  getAllFriendshipsAC: (payload: Array<FriendshipType>) =>
    ({ type: friendShipTs.GET_ALL_FRIENDSHIPS, payload } as const),
};
type ThunkActionType<T> = ThunkAction<
  Promise<T>,
  AppStateType,
  unknown,
  InferActionsTypes<typeof friendshipActions>
>;

export const getAllFriendships = (): ThunkActionType<void> => async (
  dispatch
) => {
  const res = await axios.get("/api/friendship");
  dispatch(friendshipActions.getAllFriendshipsAC(res.data.friendships));
};

export const sendFriendRequest = (
  friendId: string
): ThunkActionType<void> => async (dispatch) => {
  const res = await axios.post("/api/friendship", { friendId });
  console.log(res.data.friendships);
  dispatch(friendshipActions.createFriendshipAC(res.data.friendships));
};

export const cancelFriendRequest = (
  friendId: string
): ThunkActionType<void> => async (dispatch) => {
  try {
    await axios.post("/api/friendship/cancel", { friendId });
  } catch (error) {
    const errors = error.response.data;
    dispatch(setAlert(errors, "danger"));
  }
};

export const denyFriendRequest = (
  friendId: string
): ThunkActionType<void> => async (dispatch) => {
  try {
    await axios.post("/api/friendship/deny", { friendId });
  } catch (error) {
    const errors = error.response.data;
    dispatch(setAlert(errors, "danger"));
  }
};

import { UserType } from "./../../../appTypes&Interfaces";
import { InferActionsTypes } from "./../reducers/index";
import { setAlert } from "./alert.action";

import * as usrTs from "./types/user.types";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "..";

export type updateStatusFormDataType = {
  status: string | undefined;
};

export type editUserFormDataType = {
  name: string;
  gender: string;
  relationship: string;
  hometown: string;
};
export type updateAvatarFormDataType = FormData;

export const userActions = {
  updateStatusAC: (payload: UserType) =>
    ({ type: usrTs.UPDATE_STATUS, payload } as const),
  editUserAC: (payload: UserType) =>
    ({ type: usrTs.EDIT_USER, payload } as const),
  addToFriendsAC: (payload: Array<UserType>) =>
    ({ type: usrTs.ADD_TO_FRIENDS, payload } as const),
  removeFromFriendsAC: (payload: Array<UserType>) =>
    ({ type: usrTs.REMOVE_FROM_FRIENDS, payload } as const),
  updateAvatarAC: (payload: string) =>
    ({ type: usrTs.UPDATE_AVATAR, payload } as const),
  exitUserAC: () => ({ type: usrTs.EXIT_USER } as const),
  deleteAvatarAC: (payload: string) =>
    ({ type: usrTs.DELETE_AVATAR, payload } as const),
  userLoadedAC: (payload: UserType) =>
    ({ type: usrTs.USER_LOADED, payload } as const),
  loadUserAC: (payload: UserType) =>
    ({ type: usrTs.LOAD_USER, payload } as const),
};
type ThunkActionType<T> = ThunkAction<
  Promise<T>,
  AppStateType,
  unknown,
  InferActionsTypes<typeof userActions>
>;

export const updateUserStatus = (
  data: updateStatusFormDataType
): ThunkActionType<void> => async (dispatch) => {
  const body = { status: data.status };
  try {
    const res = await axios.put("/api/users/status", body);
    dispatch(userActions.updateStatusAC(res.data.user));
  } catch (error) {
    console.error(error.response.data);
  }
};

export const editUser = (
  data: editUserFormDataType
): ThunkActionType<void> => async (dispatch) => {
  try {
    const res = await axios.put("/api/users/edit", data);
    dispatch(userActions.editUserAC(res.data.user));
    dispatch(setAlert(res.data.msg, "success"));
  } catch (error) {
    const errors = error.response.data;
    dispatch(setAlert(errors, "danger"));
  }
};

export const addToFriends = (data: string): ThunkActionType<void> => async (
  dispatch
) => {
  try {
    const res = await axios.post("/api/users/add-friend", {
      friendUserId: data,
    });
    dispatch(userActions.addToFriendsAC(res.data.friends));
    dispatch(setAlert(res.data.msg, "success"));
  } catch (error) {
    const errors = error.response.data;
    dispatch(setAlert(errors, "danger"));
  }
};

export const removeFromFriends = (
  data: string
): ThunkActionType<void> => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/remove-friend", {
      friendUserId: data,
    });
    dispatch(userActions.removeFromFriendsAC(res.data.friends));
    dispatch(setAlert(res.data.msg, "success"));
  } catch (error) {
    const errors = error.response.data;
    dispatch(setAlert(errors, "danger"));
  }
};

export const updateUserAvatar = (file: File): ThunkActionType<void> => async (
  dispatch
) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const res = await axios.put("/api/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(userActions.updateAvatarAC(res.data.destination));
  } catch (error) {
    console.error(error.response.data);
  }
};

export const deleteUserAvatar = (): ThunkActionType<void> => async (
  dispatch
) => {
  try {
    const res = await axios.delete("/api/users/avatar");

    dispatch(userActions.deleteAvatarAC(res.data.destination));
  } catch (error) {
    console.error(error.response.data);
  }
};

export const exitUser = (): ThunkActionType<void> => async (dispatch) => {
  dispatch(userActions.exitUserAC());
};
export const userLoaded = (user: UserType): ThunkActionType<void> => async (
  dispatch
) => {
  dispatch(userActions.userLoadedAC(user));
};

export const loadUser = (user: UserType): ThunkActionType<void> => async (
  dispatch
) => {
  dispatch(userActions.loadUserAC(user));
};

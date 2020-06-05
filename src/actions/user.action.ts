import { setAlert } from './alert';
import { ActionsTypes } from "./auth.action";
import { UPDATE_STATUS, UPDATE_AVATAR, DELETE_AVATAR, EDIT_USER } from "./types/user";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../store";

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

type ThunkActionType<T> = ThunkAction<
  Promise<T>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const updateUserStatus = (
  data: updateStatusFormDataType
): ThunkActionType<void> => async (dispatch) => {
  const body = { status: data.status };
  try {
    const res = await axios.put("/api/users/status", body);
    dispatch({
      type: UPDATE_STATUS,
      payload: res.data.user,
    });
  } catch (error) {
    console.error(error.response.data);
  }
};

export const editUser = (
  data: editUserFormDataType
): ThunkActionType<void> => async (dispatch) => {
  try {
    const res = await axios.put("/api/users/edit", data);
    dispatch({
      type: EDIT_USER,
      payload: res.data.user
    })
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

    dispatch({
      type: UPDATE_AVATAR,
      payload: res.data.destination,
    });
  } catch (error) {
    console.error(error.response.data);
  }
};

export const deleteUserAvatar = (): ThunkActionType<void> => async (
  dispatch
) => {
  try {
    const res = await axios.delete("/api/users/avatar");

    dispatch({
      type: DELETE_AVATAR,
      payload: res.data.destination,
    });
  } catch (error) {
    console.error(error.response.data);
  }
};

import { userType } from "./../../appTypes&Interfaces";
import { UPDATE_STATUS } from "./types/user";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../store";

export type updateStatusFormDataType = {
  status: string | undefined;
};
type updateUserStatusType = {
  type: typeof UPDATE_STATUS;
  payload: userType;
};

export type ActionsTypes = updateUserStatusType;

export const updateUserStatus = (
  data: updateStatusFormDataType
): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (
  dispatch
) => {
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

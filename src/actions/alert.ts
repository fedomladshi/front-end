import { v4 } from "uuid";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../store";

import { SET_ALERT, REMOVE_ALERT } from "./types/alert";

export const setAlert = (
  msg: string,
  alertType: string, 
  timeout = 4000
): ThunkAction<void, AppStateType, unknown, Action<string>> => dispatch => {
  const id = v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout
  );
};

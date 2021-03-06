import { alertType } from '../../appTypes';
import { SET_ALERT, REMOVE_ALERT } from "./../actions/types/alert";

const initialState: Array<alertType> = [];

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => {
        return alert.id !== action.payload
      });
    default:
      return state;
  }
}

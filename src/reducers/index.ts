import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth.reducer";
import user from "./user.reducer";

export default combineReducers({
  alert,
  auth,
  user,
});

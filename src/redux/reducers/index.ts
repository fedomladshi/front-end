import { combineReducers } from "redux";
import alert from "./alert.reducer";
import auth from "./auth.reducer";
import user from "./user.reducer";

const rootReducer = combineReducers({
  alert,
  auth,
  user,
});

export type RootReducerType = typeof rootReducer;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;

export default rootReducer;

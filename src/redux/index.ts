import { RootReducerType } from "./reducers/index";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

export type AppStateType = ReturnType<any>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;

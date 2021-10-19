import { combineReducers } from "redux";
import productReducer from "./product";

const reducers = combineReducers({
  shop: productReducer,
});

export default reducers;

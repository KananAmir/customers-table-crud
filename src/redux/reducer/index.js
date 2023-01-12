import { combineReducers } from "redux";
import { favoritesReducer } from "./favorites.reducer";
import { customersReducer } from "./customers.reducer";

export const rootReducer = combineReducers({
  favoritesReducer,
  customersReducer
});

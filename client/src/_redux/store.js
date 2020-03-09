import { createStore, combineReducers, applyMiddleware } from "redux";
import login from "../_reducers/login";
import species from "../_reducers/species";
import register from "../_reducers/register";
import age from "../_reducers/age";
import user from "../_reducers/user";
import pet from "../_reducers/pet";
import match from "../_reducers/match";
import { logger, promise } from "../middleware/index";

const rootReducers = combineReducers({
  login,
  species,
  register,
  age,
  user,
  pet,
  match
});

const store = createStore(rootReducers, applyMiddleware(logger, promise));

export default store;

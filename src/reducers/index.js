import { combineReducers } from 'redux';
import { moviesReducer } from "./moviesReducer";
import { moviesGenresReducer } from "./moviesGanresReducer";


export const createRootReducer = () => {
  return combineReducers({
    moviesReducer,
    moviesGenresReducer,
  });
};

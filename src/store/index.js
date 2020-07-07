import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createRootReducer } from '../reducers';

export const appStore = createStore(createRootReducer(), composeWithDevTools(
  applyMiddleware(thunk)
));
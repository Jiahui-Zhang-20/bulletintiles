// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';
import errorReducer from './error-reducer';
import postReducer from './post-reducer';
import searchReducer from './search-reducer';
import authReducer from './auth-reducer';

const rootReducer = combineReducers({
  error: errorReducer,
  blog: postReducer,
  search: searchReducer,
  auth: authReducer,
});

export default rootReducer;

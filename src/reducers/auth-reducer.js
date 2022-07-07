import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  email: '',
  authorName: '',
  authenticated: false,
};

// better version that uses a curried immer function
// note: initialState is passed in as second argument rather than default parameter, and no need to return as produce handles that
const authReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      // console.log(action.payload);
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      draftState.email = action.payload.email;
      draftState.authorName = action.payload.authorName;
      draftState.authenticated = true;
      break;
    case ActionTypes.DEAUTH_USER:
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      draftState.authenticated = false;
      break;
    case ActionTypes.AUTH_ERROR:
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      draftState.authenticated = false;
      break;
    default:
      break;
  }
}, initialState);

export default authReducer;

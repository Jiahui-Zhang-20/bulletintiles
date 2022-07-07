import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  hasError: false,
  message: '',
};

// better version that uses a curried immer function
// note: initialState is passed in as second argument rather than default parameter, and no need to return as produce handles that
const errorReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.ERROR_SET:
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      draftState.hasError = true;
      draftState.message = action.payload;
      break;
    case ActionTypes.ERROR_CLEAR:
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      draftState.hasError = false;
      draftState.message = '';
      break;
    default:
      break;
  }
}, initialState);

export default errorReducer;

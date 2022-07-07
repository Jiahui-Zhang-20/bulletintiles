import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  searchTerm: '',
};

// better version that uses a curried immer function
// note: initialState is passed in as second argument rather than default parameter, and no need to return as produce handles that
const searchReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SEARCH_TERM:
      // console.log(action.payload);
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      draftState.searchTerm = action.payload;
      break;
    default:
      break;
  }
}, initialState);

export default searchReducer;

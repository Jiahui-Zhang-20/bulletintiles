import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  allPosts: [],
  currentPost: {},
};

// better version that uses a curried immer function
// note: initialState is passed in as second argument rather than default parameter, and no need to return as produce handles that
const postReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      // console.log(action.payload);
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      draftState.allPosts = action.payload;
      break;
    case ActionTypes.FETCH_POST:
      // console.log(action.payload);
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      draftState.currentPost = action.payload;
      break;
    case ActionTypes.UPDATE_POST:
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      draftState.currentPost = action.payload;
      break;
    case ActionTypes.CREATE_POST:
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      break;
    case ActionTypes.DELETE_POST:
      // eslint-disable-next-line prefer-destructuring, no-param-reassign
      break;
    default:
      break;
  }
}, initialState);

export default postReducer;

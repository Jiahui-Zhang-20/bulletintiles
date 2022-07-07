import axios from 'axios';

// const ROOT_URL = 'https://platform.cs52.me/api';
// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://bulletintilesserver.herokuapp.com/api';
// const API_KEY = '?key=USERNAME';

// keys for actiontypes
export const ActionTypes = {
  SEARCH_TERM: 'SEARCH_TERM',
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export function searchTerm(term) {
  return {
    type: ActionTypes.SEARCH_TERM,
    payload: term,
  };
}

export function fetchPosts() { /* axios get */
  // console.log('fetching all posts');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      // console.log(response);
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: response.data,
      });
    }).catch((error) => {
      // console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, payload: error.message });
    });
  };
}

export function fetchPost(id) { /* axios get */
  // console.log('fetching post');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_POST,
        payload: response.data,
      });
      dispatch({
        type: ActionTypes.ERROR_CLEAR,
        payload: null,
      });
    }).catch((error) => {
      // console.log(error.message);
      dispatch({ type: ActionTypes.ERROR_SET, payload: error.message });
    });
  };
}

export function createPost(post, navigate) { /* axios post */
  // console.log('creating post');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      navigate('/');
      navigate(0);
      dispatch({
        type: ActionTypes.CREATE_POST,
        payload: null,
      });
      dispatch({
        type: ActionTypes.ERROR_CLEAR,
        payload: null,
      });
    }).catch((error) => {
      // console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, payload: error.message });
    });
  };
}

export function updatePost(id, post) { /* axios put */
  // console.log('updating post');
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.UPDATE_POST,
        payload: response.data,
      });
      dispatch({
        type: ActionTypes.ERROR_CLEAR,
        payload: null,
      });
    }).catch((error) => {
      // console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, payload: error.message });
    });
  };
}

export function deletePost(id, navigate) { /* axios delete */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      navigate('/');
      navigate(0);
      dispatch({
        type: ActionTypes.DELETE_POST,
        payload: null,
      });
      dispatch({
        type: ActionTypes.ERROR_CLEAR,
        payload: null,
      });
    }).catch((error) => {
      // console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, payload: error.message });
    });
  };
}

export function signinUser({ email, password }, navigate) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint and passes in { email, password}
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
  return (dispatch) => {
    const signinInfo = { email, password };
    axios.post(`${ROOT_URL}/signin`, signinInfo).then((response) => {
      navigate('/');
      navigate(0);
      dispatch({
        type: ActionTypes.AUTH_USER,
        payload: response.data,
      });
      dispatch({
        type: ActionTypes.ERROR_CLEAR,
        payload: null,
      });
      localStorage.setItem('token', response.data.token);
    }).catch((error) => {
      // console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, payload: error.message });
    });
  };
}

export function signupUser({ authorName, email, password }, navigate) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    const signupInfo = { authorName, email, password };
    axios.post(`${ROOT_URL}/signup`, signupInfo).then((response) => {
      navigate('/');
      navigate(0);
      // console.log(response);
      dispatch({
        type: ActionTypes.AUTH_USER,
        payload: response.data,
      });
      dispatch({
        type: ActionTypes.ERROR_CLEAR,
        payload: null,
      });
      localStorage.setItem('token', response.data.token);
    }).catch((error) => {
      // console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, payload: error.message });
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(navigate) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    navigate('/');
    navigate(0);
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function validateToken() { /* axios post */
  // console.log('creating post');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.AUTH_USER,
        payload: response.data,
      });
      dispatch({
        type: ActionTypes.ERROR_CLEAR,
        payload: null,
      });
    }).catch((error) => {
      // console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, payload: error.message });
    });
  };
}

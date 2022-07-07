import React, { Component } from 'react';
// import {
//   BrowserRouter, Routes, Route, NavLink, useParams,
// } from 'react-router-dom';
// import {
//   BrowserRouter, Routes, Route,
// } from 'react-router-dom';
import {
  Routes, Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import '../style.scss';
import Navbar from './nav-bar';
import PostList from './post-list';
import NewPost from './new-post';
import PostDetails from './post-details';
import Signin from './signin';
import Signup from './signup';
import RequireAuth from './require-auth';
import { fetchPosts, validateToken } from '../actions';
import withRouter from './with-router';

class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.validateToken();
  }

  render() {
    return (
    // <BrowserRouter>
      <div>
        <Navbar navigate={this.props.navigate} />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/new" element={<RequireAuth> <NewPost navigate={this.props.navigate} /> </RequireAuth>} />
          <Route path="/posts/:postid" element={<PostDetails navigate={this.props.navigate} />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PostList />} />
        </Routes>
      </div>
    // </BrowserRouter>
    );
  }
}

export default withRouter(connect(null, { fetchPosts, validateToken })(App));

import React, { Component } from 'react';
// import {
//   BrowserRouter, Routes, Route, NavLink, useParams,
// } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../style.scss';
import { connect } from 'react-redux';
import {
  searchTerm, fetchPosts, signoutUser,
} from '../actions';
import withRouter from './with-router';

class Navbar extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      searchterm: '',
      authenticated: this.props.authenticated,
    };
  }

  componentDidMount() {
    this.props.searchTerm('');
  }

  // eslint-disable-next-line class-methods-use-this
  onInputSubmit = (event) => {
    event.preventDefault();
    this.props.searchTerm(event.target.value);
  };

  onInputChange = (event) => {
    this.setState({ searchterm: event.target.value });
    this.props.searchTerm(event.target.value);
  };

  onButtonSubmit = (event) => {
    this.props.searchTerm(this.state.searchterm);
    this.props.navigate('/');
  };

  onGoingHome = (event) => {
    this.setState({ searchterm: '' });
    this.props.searchTerm('');
  };

  onSigningout = (event) => {
    this.props.signoutUser(this.props.navigate);
  };

  render() {
    let buttons;
    if (this.state.authenticated) {
      buttons = (
        <NavLink to="/signout">
          <button onClick={this.onSigningout} type="button" className="btn btn-light">sign out</button>
        </NavLink>
      );
    } else {
      buttons = (
        <div className="registration-btns">
          <NavLink to="/signin">
            <button onClick={this.onSigningin} type="button" className="btn btn-success">sign in</button>
          </NavLink>
          <NavLink to="/signup">
            <button onClick={this.onSigningup} type="button" className="btn btn-success">sign up</button>
          </NavLink>
        </div>
      );
    }
    return (
      <nav id="top-nav" className="sticky">
        <div id="top-menu">
          <NavLink to="/">
            <button onClick={this.onGoingHome} type="button" className="btn btn-light">🏠 home</button>
          </NavLink>
          <NavLink to="/posts/new">
            <button type="button" className="btn btn-primary">✏️ new post</button>
          </NavLink>
          {buttons}
        </div>
        <div className="nav-title">
          <h1>
            Bulletin Tiles
          </h1>
          { this.state.authenticated
        && (
          <span>
            Welcome, {this.props.authorName}
          </span>
        )}
        </div>
        <div id="search-bar">
          <form className="form-inline" type="search" id="note-search" onSubmit={this.onInputSubmit} aria-label="Search">
            <div className="input-group">
              <input className="form-control mr-sm-2" id="search-input" type="text" onChange={this.onInputChange} placeholder="search for posts..." value={this.state.searchterm} />
              <button form="note-search" className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.onButtonSubmit}>Search</button>
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (reduxState) => (
  {
    authorName: reduxState.auth.authorName,
    authenticated: reduxState.auth.authenticated,
  });

export default withRouter(connect(mapStateToProps, {
  searchTerm, fetchPosts, signoutUser,
})(Navbar));

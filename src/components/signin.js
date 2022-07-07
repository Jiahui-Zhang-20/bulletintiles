import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinUser } from '../actions';
import withRouter from './with-router';

class Signin extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  // eslint-disable-next-line class-methods-use-this
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  // eslint-disable-next-line class-methods-use-this
  onInputSubmit = (event) => {
    event.preventDefault();
    this.onButtonSubmit();
  };

  // eslint-disable-next-line class-methods-use-this
  onButtonSubmit = (event) => {
    const loginInfo = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(loginInfo, this.props.navigate);
  };

  render() {
    return (
      <form id="signin" onSubmit={this.onInputSubmit}>
        <div className="form-group">
          <label htmlFor="input-email">
            Email
            <textarea type="email"
              className="form-control standard-textarea"
              id="input-email"
              placeholder="email"
              onChange={this.onEmailChange}
              value={this.state.email}
              rows="1"
              cols="50"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="input-password">
            Password
            <textarea type="password"
              className="form-control"
              id="input-password"
              placeholder="password"
              onChange={this.onPasswordChange}
              // value={this.state.password}
              value={'*'.repeat(this.state.password.length)}
              rows="1"
              cols="50"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-success">sign in </button>
      </form>
    );
  }
}

export default withRouter(connect(null, { signinUser })(Signin));

import React from 'react';
import store from 'store';
import { login } from 'api/data';
import { Link, browserHistory } from 'react-router';

require('assets/styles/login.scss');

export default React.createClass({
  getInitialState: function() {
    return {
      username: "",
      password: ""
    }
  },

  handleChange: function() {
    this.setState({
      username: this.refs.username.value,
      password: this.refs.password.value
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    login(this.state.username, this.state.password)
      .then(function(resp) {
        browserHistory.push('/map');
      });
  },

  render: function() {
    return (
      <div className="loginBox">
        <form action="" method="post" onSubmit={ this.handleSubmit } id="loginForm">
          <i className="fa fa-sign-in"></i>
          <input ref="username" className="login" onChange={ this.handleChange } name="username" type="text" placeholder="User Name"></input>
          <br />
          <i className="fa fa-unlock"></i>
          <input ref="password" className="password" type="password" onChange={ this.handleChange } name="password" placeholder="PassWord"></input>
          <br />
          <button className="loginButton">Login</button>
        </form>
      </div>
      );
  }
});

import React from 'react';
import store from 'store';
import {login} from 'api/data';
import { Link, browserHistory } from 'react-router';

require('assets/styles/login.scss');

export default React.createClass({
  getInitialState: function (){
    return {
      username: "",
      password: ""
    }
  },
  handleChange: function(e){
    var val = e.target.value;
    if (e.target.id === 'username') {
      this.setState({
        username: val,
        password: this.state.password
      })
    }else{
      this.setState({
        username: this.state.username,
        password: val
      })
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    login(this.state.username, this.state.password)
      .then(function(resp){
        browserHistory.push('/truckProfile');
      }.bind(this));
  },

  render: function () {
    return (
      <div className="loginBox">
        <form action="" method="post" onSubmit={this.handleSubmit} id="loginForm">
          <i className="fa fa-sign-in"></i>
          <input id="username" className="login" onChange={this.handleChange} name="username" type="text" placeholder="User Name"></input><br />
          <i className="fa fa-unlock"></i>
          <input id="password" className="password" type="password" onChange={this.handleChange} name="password" placeholder="PassWord"></input><br />
          <button className="loginButton">Login</button>
        </form>  
      </div>
    );
  }
});
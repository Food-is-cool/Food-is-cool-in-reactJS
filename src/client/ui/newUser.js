import React from 'react';
import store from 'store';
import { addNewUser } from 'api/data';
import { Link, browserHistory } from 'react-router';


require('assets/styles/newUser.scss');

export default React.createClass({
  getInitialState: function() {
    return {
      username: "",
      password: "",
      confirm: "",
      error: false
    }
  },

  handleChange: function() {
    this.setState({
      username: this.refs.username.value,
      password: this.refs.password.value,
      confirm: this.refs.confirm.value,
      type: this.refs.type.value
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    if (this.state.password !== this.state.confirm) {
      this.setState({
        error: true,
        username: "",
        password: "",
        confirm: "",
        type: ""
      });
      return;
    }

    addNewUser(this.state.username, this.state.password, this.state.type)
      .then(function(resp) {
        browserHistory.push('/map');
      });
  },

  render: function() {
    return (
      <div className="registerBox">
        <form action="" method="post" onSubmit={ this.handleSubmit } id="loginForm">
          <i className="fa fa-sign-in"></i>
          <input ref="username" className="login" onChange={ this.handleChange } type="text" placeholder="User Name"></input>
          <br />
          <i className="fa fa-unlock"></i>
          <input ref="password" className="password" onChange={ this.handleChange } type="password" placeholder="PassWord"></input>
          <br />
          <i className="fa fa-unlock"></i>
          <input ref="confirm" className="confirmPassword" onChange={ this.handleChange } type="password" placeholder="Confirm PassWord"></input>
          <br />
          <select ref="type" className="foodTruckSelector" onChange={ this.handleChange }>
            <option value="foodTruckCustomer">Food Truck Customer</option>
            <option value="foodTruckVendor">Food Truck Vendor</option>
          </select>
          <button className="loginButton">Register</button>
        </form>
      </div>
    )
  }
})

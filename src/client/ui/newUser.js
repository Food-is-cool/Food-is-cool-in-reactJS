import React from 'react';
import store from 'store';
import {addNewUser} from 'api/data';
import { Link, browserHistory } from 'react-router';


require('assets/styles/newUser.scss');

export default React.createClass({
  getInitialState: function (){
    return {
      username: "",
      password: "",
      confirm: "",
      error: false
    }
  },
  handleChange: function(e){
    var val = e.target.value;
    switch (e.target.id) {
      case 'username':
        this.setState({
          username: val,
          password: this.state.password,
          confirm: this.state.confirm
        });
        break;

      case 'password':
        this.setState({
          username: this.state.username,
          password: val,
          confirm: this.state.confirm
        });
        break;

      default:
        this.setState({
          username: this.state.username,
          password: this.state.password,
          confirm: val
        });
        break;
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    if (this.state.password === this.state.confirm){
      addNewUser(this.state.username, this.state.password)
        .then(function(resp){
          browserHistory.push('/truckProfile');
        }.bind(this));
    }else{
      this.setState({
        error: true,
        username: "",
        password: "",
        confirm: ""
      })
    }
  },
  render: function () {
    return (
      <div className="registerBox">
        <form action="" method="post" onSubmit={this.handleSubmit} id="loginForm">
          <i className="fa fa-sign-in"></i>
          <input id="username" className="login" onChange={this.handleChange} type="text" placeholder="User Name"></input><br />
          <i className="fa fa-unlock"></i>
          <input id="password" className="password" onChange={this.handleChange} type="password" placeholder="PassWord"></input><br />
          <i className="fa fa-unlock"></i>
          <input id="confirm" className="confirmPassword" onChange={this.handleChange} type="password" placeholder="Confirm PassWord"></input><br />
          <select className="foodTruckSelector">
            <option value="foodTruckCustomer">Food Truck Customer</option>
            <option value="foodTruckVendor">Food Truck Vendor</option>
          </select>
          <button className="loginButton">Register</button>
        </form>
      </div>
    )}
})
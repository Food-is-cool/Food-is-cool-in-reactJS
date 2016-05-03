import React from "react";
import store from "store";
import { addNewUser, getHomePage } from "api/data";
import { Link, browserHistory } from "react-router";


require("assets/styles/newUser.scss");

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
            isTruck: this.refs.truck.checked
        });
    },

    handleSubmit: function(e) {
        e.preventDefault();

        if (this.state.password !== this.state.confirm) {
            this.setState({
                error: true,
                password: "",
                confirm: ""
            });
            return;
        }

        addNewUser(this.state.username, this.state.password, this.state.isTruck)
            .then(getHomePage)
            .then(url => browserHistory.push(url));
    },

    render: function() {
        return (
            <div className="registerBox">
              <form action="" method="post" onSubmit={ this.handleSubmit } id="loginForm">
                <i className="fa fa-sign-in"></i>
                <input ref="username" className="login" value={ this.state.username } onChange={ this.handleChange } type="text" placeholder="User Name"></input>
                <br />
                <i className="fa fa-unlock"></i>
                <input ref="password" className="password" value={ this.state.password } onChange={ this.handleChange } type="password" placeholder="PassWord"></input>
                <br />
                <i className="fa fa-unlock"></i>
                <input ref="confirm" className="confirmPassword" value={ this.state.confirm } onChange={ this.handleChange } type="password" placeholder="Confirm PassWord"></input>
                <br />
                <input ref="customer" className="radioButtons" onChange={ this.handleChange } type="radio" name="customerType" value="foodTruckCustomer" checked={ !this.state.isTruck }
                /> Food Truck Customer
                <br />
                <input ref="truck" className="radioButtons" onChange={ this.handleChange } type="radio" name="customerType" value="foodTruckVendor" checked={ this.state.isTruck }
                /> Food Truck Vendor
                <br />
                <button className="loginButton">Register</button>
              </form>
            </div>
        )
    }
})

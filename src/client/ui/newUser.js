import React from "react";
import store from "store";
import { addNewUser } from "api/data";
import { notify } from "react-notify-toast";
import _ from "lodash";
import { goToUrl, flipLogin } from "utils/animation";

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
            .then(function() {
                if (window.localStorage.getItem("is_truck")) {
                    goToUrl("/truckProfile");

                } else {
                    goToUrl("/customerProfile");
                }
            })
            .catch(function(err) {
                const messages = _.map(err.data, function(messages, field) {
                    if (field === "non_field_errors") {
                        return messages[0];
                    }

                    return `${field}: ${messages[0]}`;
                });

                const message = messages[0] || "An unknown error occurred";

                notify.show(message, "error");
            })
    },

    render: function() {
        return (
            <div className="registerBox">
              <form action="" method="post" onSubmit={ this.handleSubmit } id="loginForm" className="loginForm">
                <i className="fa fa-sign-in"></i>
                <input ref="username" className="login" value={ this.state.username } onChange={ this.handleChange } type="text" placeholder="Username"></input>
                <i className="fa fa-unlock"></i>
                <input ref="password" className="password" value={ this.state.password } onChange={ this.handleChange } type="password" placeholder="Password"></input>
                <i className="fa fa-unlock"></i>
                <input ref="confirm" className="confirmPassword" value={ this.state.confirm } onChange={ this.handleChange } type="password" placeholder="Confirm Password"></input>
                <div className="radioButtonsContainer">
                  <div className="radioButton">
                    <input ref="customer" className="radioButtons" onChange={ this.handleChange } type="radio" name="customerType" value="foodTruckCustomer" checked={ !this.state.isTruck }></input>
                    <span className="radioTitle">Food Truck Customer</span>
                  </div>
                  <div className="radioButton">
                    <input ref="truck" className="radioButtons" onChange={ this.handleChange } type="radio" name="customerType" value="foodTruckVendor" checked={ this.state.isTruck }></input>
                    <span className="radioTitle">Food Truck Vendor</span>
                  </div>
                </div>
                <div className="loginButtonContainer">
                  <button className="registerButton">Register</button>
                </div>
                <div className="flipLinkContainer">
                  <a className="flipLink" href="#" onClick={ flipLogin }>Click here to login</a>
                </div>
              </form>
            </div>
        )
    }
})

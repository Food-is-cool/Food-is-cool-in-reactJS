import React from "react";
import store from "store";
import { login } from "api/data";
import { notify } from "react-notify-toast";
import _ from "lodash";
import { goToUrl, flipLogin } from "utils/animation";

require("assets/styles/login.scss");

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

    demoCustomer: function(e) {
        e.preventDefault();
        this.doLogin("customer1", "password!")
    },

    demoTruck: function(e) {
        e.preventDefault();
        this.doLogin("truck1", "password!")
    },

    handleSubmit: function(e) {
        e.preventDefault();
        this.doLogin(this.state.username, this.state.password);
    },

    doLogin: function(username, password) {
        login(username, password)
            .then(function() {
                const is_truck = JSON.parse(window.localStorage.getItem("is_truck"));
                if (is_truck) {
                    goToUrl("/whereWhen");
                } else {
                    goToUrl("/map");
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
            <div className="loginBox">
              <div className="loginControls">
                <form action="" method="post" onSubmit={ this.handleSubmit } id="loginForm">
                  <i className="fa fa-sign-in"></i>
                  <input ref="username" className="login" onChange={ this.handleChange } name="username" type="text" placeholder="User Name"></input>
                  <br />
                  <i className="fa fa-unlock"></i>
                  <input ref="password" className="password" type="password" onChange={ this.handleChange } name="password" placeholder="Password"></input>
                  <br />
                  <button className="loginButton">Login</button>
                </form>
              </div>
              <div className="demo">
                <button onClick={ this.demoCustomer } className="demoCustomer">DEMO Customer</button>
                <br />
                <button onClick={ this.demoTruck } className="demoTruck">DEMO Truck User </button>
              </div>
              <div className="flipLinkLoginContainer">
                <a className="flipLinkLogin" href="#" onClick={ flipLogin }>Need to register?</a>
              </div>
            </div>
            );
    }
});

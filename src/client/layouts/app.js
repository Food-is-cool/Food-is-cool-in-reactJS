import React from "react";
import { Link, browserHistory } from "react-router";
import { logout } from "api/data";
import Notifications from "react-notify-toast";

require("normalize.scss/normalize.scss");
require("assets/styles/layout.scss");

var img = require("assets/images/foodtrucklogo.png");
var image = require("assets/images/logout5.png")

function onLogout(e) {
    e.preventDefault();

    logout();
}

function updateProfilebutton(e) {
    e.preventDefault();
    browserHistory.push("/truckProfile");
}

function updateWhereWhen(e) {
    e.preventDefault();
    browserHistory.push("/whereWhen");
}

function toMap(e) {
    e.preventDefault();
    browserHistory.push("/map");
}

function toCustomerProfile(e) {
    e.preventDefault();
    browserHistory.push("/customerProfile");
}

function getNavs() {
    if (!window.localStorage.getItem("token")) {
        return (<div className="navs"></div>);
    }

    const is_truck = window.localStorage.getItem("is_truck") === "true";

    if (is_truck) {
        return (
            <nav className="navs">
              <div className="profileButtonContainer">
                <button onClick={ updateProfilebutton } className="updateProfilebutton">Update Profile</button>
              </div>
              <div className="WhenWhereButtonContainer">
                <button onClick={ updateWhereWhen } className="updateWhereWhen">Update Location</button>
              </div>
              <a className="logoutButtonContainer">
                <img src={ image } onClick={ onLogout } className="logout" />
              </a>
            </nav>
            );
    }

    return (
        <nav className="navs">
          <div className="toMapContainer">
            <button onClick={ toMap } className="toMap">To maps</button>
          </div>
          <div className="toCustomerProfileContainer">
            <button onClick={ toCustomerProfile } className="toCustomerProfile">To Profile</button>
          </div>
          <a className="logoutButtonContainer">
            <img src={ image } onClick={ onLogout } className="logout" />
          </a>
        </nav>
        );
}

export default ({
        children
    }) => {

    return (
        <div>
          <Notifications />
          { getNavs() }
          <div className="logoContainer">
            <a className="fakeTrucks" href="/fakeTrucks">
              <img className="logo" src={ img } />
              <div className="foodiscool">foodis.cool</div>
            </a>
          </div>
          { children }
        </div>
    )
}

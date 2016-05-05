import React from "react";
import { Link } from "react-router";
import { logout } from "api/data";
import Notifications from "react-notify-toast";

require("normalize.scss/normalize.scss");
require("assets/styles/layout.scss");

var img = require("assets/images/foodtrucklogo.png");

function onLogout(e) {
    e.preventDefault();

    logout();
}

function getNavs() {
    if (!window.localStorage.getItem("token")) {
        return (<div className="navs"></div>);
    }

    const is_truck = window.localStorage.getItem("is_truck") === "true";

    if (is_truck) {
        return (
            <nav className="navs">
              <Link to="/truckProfile" className="nav">Truck Profile</Link>
              <br />
              <Link to="/whereWhen" className="nav">Where When</Link>
              <button onClick={ onLogout }>Logout</button>
            </nav>
            );
    }

    return (
        <nav className="navs">
          <Link to="/map" className="nav">Map</Link>
          <br />
          <Link to="/customerProfile" className="nav">Customer Profile</Link>
          <button onClick={ onLogout }>Logout</button>
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
            <a href="/fakeTrucks">
              <img className="logo" src={ img } />
              <div className="foodiscool">Foodis.cool</div>
            </a>
          </div>
          { children }
        </div>
    )
}

import React from "react";
import { Link } from "react-router";
import { logout } from "api/data";

require("normalize.scss/normalize.scss");
require("assets/styles/layout.scss");

var img = require("assets/images/foodtrucklogo.png");

function onLogout(e) {
    e.preventDefault();

    logout();
}
export default ({
        children
    }) => {
    return (
        <div>
          <nav className="navs">
            <Link to="/" className="nav">Login</Link>
            <br />
            <Link to="/truckProfile" className="nav">Truck Profile</Link>
            <br />
            <Link to="/whereWhen" className="nav">Where When</Link>
            <br />
            <Link to="/map" className="nav">Map</Link>
            <br />
            <Link to="/truckInfo/3"className="nav">Truck Info</Link>
            <br />
            <Link to="/customerProfile" className="nav">Customer Profile</Link>
            <br />
            <Link to="/fakeTrucks" className="nav">Set up Fake Trucks</Link>
            <br />
          </nav>
          <div className="logoContainer">
            <img className="logo" src={ img } />
            <div className="foodiscool">Foodis.cool</div>
          </div>
          <button onClick={ onLogout }>Logout</button>
          { children }
        </div>
    )
}

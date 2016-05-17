import React from "react";
import { logout } from "api/data";
import Notifications from "react-notify-toast";
import { goToUrl } from "utils/animation";

require("normalize.scss/normalize.scss");
require("assets/styles/layout.scss");

var foodTruck = require("assets/images/FoodTruck.png");
var foodTruckBackground = require("assets/images/FoodTruckBackground.png");
var image = require("assets/images/logout5.png")

function onLogout(e) {
    e.preventDefault();
    logout();
}

function updateProfilebutton(e) {
    e.preventDefault();
    goToUrl("/truckProfile");
}

function updateWhereWhen(e) {
    e.preventDefault();
    goToUrl("/whereWhen");
}

function toMap(e) {
    e.preventDefault();
    goToUrl("/map");
}

function toCustomerProfile(e) {
    e.preventDefault();
    goToUrl("/customerProfile");
}

function getNavs() {
    if (!window.localStorage.getItem("token")) {
        return (<div className="navs"></div>);
    }

    const is_truck = window.localStorage.getItem("is_truck") === "true";

    if (is_truck) {
        return (
            <nav className="navs">
              <div className="navButtons">
                <div className="profileButtonContainer">
                  <button onClick={ updateProfilebutton } className="updateProfilebutton">My Profile</button>
                </div>
                <div className="WhenWhereButtonContainer">
                  <button onClick={ updateWhereWhen } className="updateWhereWhen">Update Location</button>
                </div>
              </div>
              <a className="logoutButtonContainer">
                <img src={ image } onClick={ onLogout } className="logout" />
                <div className="logoutText">Logout</div>
              </a>
            </nav>
            );
    }

    return (
        <nav className="navs">
          <div className="navButtons">
            <div className="toMapContainer">
              <button onClick={ toMap } className="toMap">Food Truck Map</button>
            </div>
            <div className="fakeDiv"></div>
            <div className="toCustomerProfileContainer">
              <button onClick={ toCustomerProfile } className="toCustomerProfile">My Profile</button>
            </div>
          </div>
          <a className="logoutButtonContainer">
            <img src={ image } onClick={ onLogout } className="logout" />
            <div className="logoutText">Logout</div>
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
            <img className="foodTruckBackground" src={ foodTruckBackground } />
            <div id="foodTruck" className="foodTruck animated bounceInLeft">
              <img className="foodTruckImage" src={ foodTruck } />
              <a className="fakeTrucks" href="/fakeTrucks">
                <div className="foodiscool">foodis.cool</div>
              </a>
            </div>
          </div>
          { children }
        </div>
    )
}

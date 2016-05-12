import { browserHistory } from "react-router";
import { toggleClass } from "utils/classNames";

function animateFoodTruckOut() {
    const foodTruck = document.getElementById("foodTruck");
    foodTruck.className = foodTruck.className.replace("bounceInLeft", "bounceOutRight");
}

function animateFoodTruckIn() {
    const foodTruck = document.getElementById("foodTruck");
    foodTruck.className = foodTruck.className.replace("bounceOutRight", "bounceInLeft");
}

function goToUrl(url) {
    animateFoodTruckOut();
    setTimeout(() => {
        browserHistory.push(url);
        animateFoodTruckIn();
    }, 1000);

    return false;
}

function flipLogin(e) {
    e.preventDefault();

    const element = document.getElementById("loginPageContainer");
    toggleClass(element, "flipped");
}

global.goToUrl = goToUrl;

export default {
    goToUrl,
    flipLogin
}

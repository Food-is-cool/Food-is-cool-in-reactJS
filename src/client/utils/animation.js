import { browserHistory } from "react-router";

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

global.goToUrl = goToUrl;

export default {
    goToUrl
}

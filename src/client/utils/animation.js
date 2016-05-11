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

function flipLogin(e) {
    e.preventDefault();

    const container = document.getElementById("loginPageContainer");
    let classes = container.className.split(" ");

    if (_.includes(classes, "flipped")) {
        classes = _.without(classes, "flipped");
    } else {
        classes.push("flipped");
    }

    container.className = classes.join(" ");
}

global.goToUrl = goToUrl;

export default {
    goToUrl,
    flipLogin
}

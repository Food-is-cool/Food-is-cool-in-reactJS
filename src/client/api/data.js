import React from "react";
import api from "api/api";
import { goToUrl } from "utils/animation";

let positionResolves = [];
let position = undefined;

api.new("http://arcane-beach-47500.herokuapp.com/");

navigator.geolocation.getCurrentPosition(function(currentPosition) {
    position = currentPosition;
    positionResolves.forEach(resolve => resolve(position));
    positionResolves = [];
});

export function login(user, pass) {
    return api.login(user, pass);
}

export function getUsers() {
    return api.get("api/users/");
}

export function addNewUser(username, password, isTruck) {
    const payload = {
        username: username,
        password: password
    };

    let url;
    if (isTruck) {
        url = "api/trucks/users/";
    } else {
        url = "api/customers/users/";
    }

    return api.post(url, payload)
        .then(function() {
            return api.login(username, password);
        });
}

export function getCustomerProfile() {
    return api.get("api/customers/users/current/")

        .then(function(result) {
            return result.data.results[0];
        })
}

export function saveCustomerProfile(id, payload) {
    return api.patch("api/customers/users/" + id, payload);
}

export function getAllTrucks() {
    return api.get("api/trucks/")
        .then(function(result) {
            return result.data.results;
        });
}

export function getCurrentTruckProfile() {
    return api.get("api/trucks/users/current/")
        .then(function(result) {
            return result.data.results[0];
        })
}

export function getTruckProfile(truckId) {
    return api.get("api/trucks/users/" + truckId)
        .then(function(result) {
            return result.data;
        })
}

export function getYelpReviews(truckId) {
    return api.get("api/trucks/users/yelp/" + truckId)
        .then(function(result) {
            return result.data;
        })
}

export function saveTruckProfile(id, payload) {
    if (!id) {
        return api.post("api/trucks/users/", payload);
    }
    return api.patch("api/trucks/users/" + id, payload);
}

export function getCurrentPosition() {
    if (position) {
        return new Promise(resolve => {
            resolve(position);
        });
    }

    return new Promise(resolve => {
        positionResolves.push(resolve);
    });
}

export function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("is_truck");
    goToUrl("/");
}

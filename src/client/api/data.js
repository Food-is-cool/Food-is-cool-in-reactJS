import React from "react";
import api from "api/api";

let positionResolves = [];
let position = undefined;

api.new("http://arcane-beach-47500.herokuapp.com/api/");

navigator.geolocation.getCurrentPosition(function(currentPosition) {
    console.log("Got the lat/long");
    position = currentPosition;
    positionResolves.forEach(resolve => resolve(position));
    positionResolves = [];
});

export function login(user, pass) {
    return api.login(user, pass);
}

export function getUsers() {
    return api.get("users/users/");
}

export function addNewUser(username, password, isTruck) {
    const payload = {
        username: username,
        password: password,
        is_staff: isTruck
    };

    return api.post("users/", payload)
        .then(function() {
            return api.login(username, password);
        })
        .catch(function(err) {
            console.log(err);
        });
}

export function getCustomerProfile() {
    return api.get("customers/current/")
        .then(function(result) {
            return result.data.results[0];
        })
}

export function saveCustomerProfile(id, payload) {
    return api.patch("customers/" + id, payload);
}

export function getAllTrucks() {
    return api.get("trucks/")
        .then(function(result) {
            return result.data.results;
        });
}

export function getCurrentTruckProfile() {
    return api.get("trucks/current/")
        .then(function(result) {
            return result.data.results[0];
        })
}

export function getTruckProfile(truckId) {
    return api.get("trucks/" + truckId)
        .then(function(result) {
            return result.data;
        })
}

export function saveTruckProfile(id, payload) {
    if (!id) {
        return api.post("trucks/", payload);
    }

    return api.patch("trucks/" + id, payload);
}

export function getCurrentUser() {
    return api.get("users/current/")
        .then(function(result) {
            return result.data.results[0];
        })
}

export function getHomePage() {
    return getCurrentUser()
        .then(function(userProfile) {
            if (userProfile.is_staff) {
                return "/truckProfile";
            }

            return "/map";
        });
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

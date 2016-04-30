import api from "api/api";

api.new("http://arcane-beach-47500.herokuapp.com/api/");

export function login(user, pass) {
    return api.login(user, pass);
}

export function getUsers() {
    return api.get("users/users/");
}

export function addNewUser(username, password, type) {
    const payload = {
        username: username,
        password: password,
        is_staff: type === "foodTruckVendor"
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

export function getTruck() {
    return api.get("trucks/current/")
        .then(function(result) {
            return result.data.results[0];
        })
}
export function getCurrentUser() {
    return api.get("users/current/")
        .then(function(result) {
            return result.data.results[0];
        })
}
export function saveCustomerProfile(id, payload) {
    return api.patch("customers/" + id, payload);
}

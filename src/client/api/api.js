import axios from "axios";
import Cookie from "js-cookie";

var instance = axios.create();

instance.new = function(url) {
    this.defaults.baseURL = url;
};

instance.interceptors.request.use(function(config) {
    var token = window.localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Token " + token;
    }
    return config;
});

instance.login = function(user, pass) {
    const payload = {
        username: user,
        password: pass
    };

    const self = this;

    return this.post("api-token-auth/", payload)
        .then(function(result) {
            debugger;
            window.localStorage.setItem("token", result.data.token);
            debugger;
            return self.get("api/users/current/")
        })
        .then(function(result) {
            debugger;
            const is_truck = (result.data.count > 0) && result.data.results[0].is_truck;
            debugger;
            window.localStorage.setItem("is_truck", is_truck);
        })
        .catch(function(err) {
            debugger;
            window.localStorage.removeItem("is_truck");
        });
};

export default instance;

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
            window.localStorage.setItem("token", result.data.token);

            return self.get("api/trucks/users/current/");
        })
        .then(function(result) {
            const is_truck = (result.count > 0);
            window.localStorage.setItem("is_truck", is_truck);
        })
        .catch(function(err) {
            window.localStorage.removeItem("is_truck");
        });
};

export default instance;

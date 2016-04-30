import axios from "axios";
import Cookie from "js-cookie";

var instance = axios.create();

instance.new = function(url) {
    this.defaults.baseURL = url;
};

instance.interceptors.request.use(function(config) {
    var token = Cookie.get("token");
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

    return this.post("api-token-auth/", payload)
        .then(function(resp) {
            Cookie.set("token", resp.data.token);
            return resp;
        });
};

export default instance;

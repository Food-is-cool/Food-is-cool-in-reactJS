import api from 'api/api';

api.new('http://arcane-beach-47500.herokuapp.com/api/');
// api.new('http://10.68.0.26:8000/api/');

export function login(user, pass) {
  return api.login(user, pass);
}

export function getUsers() {
  return api.get('users/users/');
}

export function addNewUser(username, password, type) {
  const payload = {
    username: username,
    password: password,
    is_staff: type === "foodTruckVendor"
  };

  debugger;

  return api.post('users/', payload)
    .then(function() {
      return api.login(username, password);
    })
    .catch(function(err) {
      console.log(err);
    });
}

export function currentUserProfile() {
  return api.get('customers/current/').then(function(profile) {
    console.log(profile);
  })
}

export function getTruck() {
  return api.get('trucks/current/').then(function(profile) {
    console.log(profile);
  })
}

import api from 'api/api';

api.new('http://arcane-beach-47500.herokuapp.com/api/');
// api.new('http://10.68.0.26:8000/api/');

export function login(user, pass) {
  return api.login(user, pass);
}

export function getUsers() {
  return api.get('users/users/');
}

export function addNewUser(username, password, cb){
	return api.post('users/', {username:username, password:password}).then(function(){
	  api.login(username, password).then(function(){
	     cb();
	  }).catch(function(err){
	    console.log(err);
	  });
	}).catch(function(err){
	  console.log(err);
	});
}
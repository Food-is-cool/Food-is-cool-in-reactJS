import React from 'react';
import {login} from 'api/data';
import {addNewUser} from 'api/data';
import { Link, browserHistory } from 'react-router';
import store from 'store';
import NewUser from 'ui/newUser';
import LoginContainer from 'ui/loginContainer';

require('assets/styles/login.scss');
require('font-awesome-webpack');



export default React.createClass({
  render: function () {
    return (
      <div>
        <div className="loginContainer">
          <NewUser />
          <LoginContainer />
        </div>
      </div>
    )
  }
})

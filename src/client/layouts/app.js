import React from 'react';
import { Link } from 'react-router';

require('normalize.scss/normalize.scss');
require('assets/styles/layout.scss');

var img = require('assets/images/foodtrucklogo.png');


export default ({children}) => {
  return (
    <div>
	    <nav>
	      <Link to="/">Login</Link><br />
	      <Link to="/truckProfile">Truck Profile</Link><br />
	      <Link to="/whereWhen">Where When</Link><br />
	      <Link to="/map">Map</Link><br />
	      <Link to="/truckInfo">Truck Info</Link><br />
	      <Link to="/customerProfile">Customer Profile</Link><br />
	    </nav>
	    	<div className="logoContainer">
	      	<img className="logo" src={img} />
	      	<div className="foodiscool">Food is cool</div>
	      </div>
    	{children}
    </div>
  )
}

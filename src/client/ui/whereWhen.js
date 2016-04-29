import React from 'react';

require('assets/styles/whereWhen.scss');

export default React.createClass({
  render: function () {
    return (
    	<div className="wwContainer">
    		<form className="whereWhenContainer">
	    		<div className="timeTitle">How long will you be at this location?</div>
	    		<div className="flexTime">
		    		<button className="setTime">2 Hours</button>
		    		<button className="setTime">4 Hours</button>
		    		<button className="setTime">6 Hours</button>
		    		<button className="setTime">8 Hours</button>
		    		<button className="setTime">10 Hours</button>
		    		<button className="setTime">12 Hours</button>
	    		</div>
	    		<div className="locationTitle">click to set location</div>
	    		<button className="setLocation">Set Location</button>
	    	</form>
	    	<button className="updateProfile">Update Profile</button>
    	</div>
    )
  }
})
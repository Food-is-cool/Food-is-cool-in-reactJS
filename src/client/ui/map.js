import React from 'react';

require('assets/styles/map.scss');

export default React.createClass({
  render: function () {
    return (
    	<div className="mapContainer">
    		<iframe
			  width="698"
			  height="398"
			  frameborder="0" 
			  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAEE6F3HwX-Seoso5S1KP9g3sA5Thd_qmo
			    &q=The+IronYard,Las+Vegas+NV" allowfullscreen>
			</iframe>
    	</div>
    )
  }
})
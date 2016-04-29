import React from 'react';

require('assets/styles/map.scss');

export default React.createClass({
  componentDidMount: function() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 36.198860168457,
        lng: -115.11750030518
      },
      zoom: 12
    });
  },

  render: function() {
    return (
      <div className="mapContainer">
        <div className="map" id="map"></div>
      </div>
    )
  }
})

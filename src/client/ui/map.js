import React from "react";
import { getCurrentPosition, getAllTrucks } from "api/data";

require("assets/styles/map.scss");

const mapStyles = [
    {
        featureType: "all",
        stylers: [
            {
                saturation: -80
            }
        ]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                hue: "#0D202A"
            },
            {
                saturation: 30
            },
            {
                lightness: -30
            }
        ]
    }, {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
            {
                visibility: "on"
            }
        ]
    }
];

export default React.createClass({
    getInitialState: function() {
        return {
            trucks: []
        };
    },

    componentDidMount: function() {
        getCurrentPosition().then(this.handlePosition);

        getAllTrucks().then(this.onTrucks);
    },
    onTrucks: function(trucks) {
        this.setState({
            trucks: trucks
        });

        this.makeTruckMarkers();
    },
    handlePosition: function(position) {
        this.setState({
            position: position
        });

        this.map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 15
        });

        this.map.setOptions({
            styles: mapStyles
        });

        this.home = new google.maps.Marker({
            position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: "#0080FF",
                fillOpacity: 1.0,
                strokeColor: "white",
                strokeWeight: 2,
                scale: 8
            },
            draggable: false,
            map: this.map
        });

        // TODO: We could use position.coords.accuracy (meters) to draw a circle around the "home" indicator
        // to indicate the accuracy.

        this.makeTruckMarkers();
    },

    makeTruckMarkers: function() {
        if (this.map && this.state.trucks) {
            this.markers = this.state.trucks.map(this.makeTruckMarker);
        }
    },

    makeTruckMarker: function(truck) {
        const marker = new google.maps.Marker({
            position: {
                lat: truck.latitude,
                lng: truck.longitude
            },
            map: this.map,
            title: truck.truck_name
        });

        let self = this;
        marker.addListener("click", function() {
            self.showInfoWindow(truck, marker);
        });
    },

    showInfoWindow: function(truck, marker) {
        if (this.infowindow) {
            this.infowindow.close();
        }

        this.infowindow = new google.maps.InfoWindow({
            content: `
            <div class="truckPopup">
                <h2>${truck.truck_name}</h2>
                <div><i>Cuisine: ${truck.cuisine}</i></div>
                <div>Time Left:</div>
                <a href='/truckInfo/${truck.id}'>Get Details...</a>
                <a href='http://maps.google.com/?saddr=${this.state.position.coords.latitude},${this.state.position.coords.longitude}&daddr=${truck.latitude},${truck.longitude}'>Get Directions...</a>
            </div>
        `
        });
        this.infowindow.open(this.map, marker);
    },

    render: function() {
        return (
            <div className="mapContainer">
              <div className="map" id="map">
                Loading...
              </div>
              <button className="customerProfile">Update Profile</button>
            </div>
        )
    }
})

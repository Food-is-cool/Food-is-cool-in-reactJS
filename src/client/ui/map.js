import React from "react";
import { getCurrentPosition, getAllTrucks } from "api/data";

require("assets/styles/map.scss");

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
        <H2>${truck.name}</H2>
        <H3><i>Cuisine</i></H3>
        <a href='/truckInfo/${truck.id}'>Get Details...</a>
        <a href='http://maps.google.com/?saddr=${this.state.position.coords.latitude},${this.state.position.coords.longitude}&daddr=${truck.latitude},${truck.longitude}'>Get Directions...</a>
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
            </div>
        )
    }
})

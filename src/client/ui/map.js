import React from "react";
import { getCurrentPosition } from "api/data";

require("assets/styles/map.scss");

export default React.createClass({
    getInitialState: function() {
        return {
            trucks: [
                {
                    name: "Truck 1",
                    latitude: 36.255530,
                    longitude: -115.288492
                },
                {
                    name: "Truck 2",
                    latitude: 36.237384,
                    longitude: -115.291366
                },
                {
                    name: "Truck 3",
                    latitude: 36.260676,
                    longitude: -115.269751
                },
                {
                    name: "Truck 4",
                    latitude: 36.272446,
                    longitude: -115.310956
                }
            ]
        };
    },

    componentDidMount: function() {
        const position = getCurrentPosition();
        this.handlePosition(position);
    },

    handlePosition: function(position) {
        this.position = position;

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

        this.markers = this.state.trucks.map(this.makeTruckMarker);
    },

    makeTruckMarker: function(truck) {
        const marker = new google.maps.Marker({
            position: {
                lat: truck.latitude,
                lng: truck.longitude
            },
            map: this.map,
            title: truck.name
        });

        const infowindow = new google.maps.InfoWindow({
            content: `
        <H2>${truck.name}</H2>
        <H3><i>Cuisine</i></H3>
        <a href='/truckInfo'>Get Details...</a>
        <a href='http://maps.google.com/?saddr=${this.position.coords.latitude},${this.position.coords.longitude}&daddr=${truck.latitude},${truck.longitude}'>Get Directions...</a>
        `
        });

        marker.addListener("click", function() {
            infowindow.open(this.map, marker);
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

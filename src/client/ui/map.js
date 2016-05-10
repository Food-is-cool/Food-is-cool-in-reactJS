import React from "react";
import Moment from "moment";
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

        this.interval_id = setInterval(this.updateTimeLeft, 1000);
    },

    componentWillUnMount: function() {
        if (this.interval_id) {
            clearInterval(this.interval_id);
            this.interval_id = undefined;
        }

        this.infowindow = undefined;
        this.unmounted = true;
    },

    updateTimeLeft: function() {
        if (!this.infowindow) {
            return;
        }

        const timeLeft = document.getElementById("timeLeft");
        const hereUntil = document.getElementById("hereUntil");
        if (timeLeft) {
            const expiration = Moment(this.infowindow.expiration);
            const diff = expiration.diff(new Moment(), "milliseconds");
            if (diff < 0) {
                hereUntil.innerHTML = "Already gone";
                timeLeft.innerHTML = "...";
                return;
            }

            const remaining = Moment.utc(diff).format("H:mm:ss");
            hereUntil.innerHTML = expiration.format("h:mm:ss A");
            timeLeft.innerHTML = remaining;
        }
    },

    onTrucks: function(trucks) {
        if (this.unmounted) {
            return;
        }

        this.setState({
            trucks: trucks
        });

        this.makeTruckMarkers();
    },

    handlePosition: function(position) {
        if (this.unmounted) {
            return;
        }

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
        if (!truck.latitude || !truck.longitude) {
            return;
        }

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
                <div class="truckName">${truck.truck_name}</div>
                <div class="cuisine_container">
                    <span class="cuisine">Cuisine:</span>
                    <span>${truck.cuisine}</span>
                </div>
                <div class="time_container">
                    <span class="time">Time Remaining:</span>
                    <span id="timeLeft"></span>
                </div>
                <div class="time_container">
                    <span class="time">Here Until:</span>
                    <span id="hereUntil"></span>
                </div>
                <div>Specials:${truck.specials}</div>
                <a href='/truckInfo/${truck.id}' onclick="return goToUrl('/truckInfo/${truck.id}')">Get Details...</a>
                <a href='http://maps.google.com/?saddr=${this.state.position.coords.latitude},${this.state.position.coords.longitude}&daddr=${truck.latitude},${truck.longitude}'>Get Directions...</a>
            </div>
        `
        });
        this.infowindow.expiration = truck.expiration;
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

import React from "react";
import Moment from "moment";
import { getCurrentPosition, getAllTrucks, getCustomerProfile } from "api/data";
import mapUtils from "utils/map";
import _ from "lodash";

require("assets/styles/map.scss");

export default React.createClass({
    getInitialState: function() {
        return {
            trucks: [],
            userProfile: {
                liked_trucks: []
            }
        };
    },

    componentDidMount: function() {
        Promise.all([
            getCurrentPosition(),
            getAllTrucks(),
            getCustomerProfile()
        ]).then(this.handleData);

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

    handleData: function(results) {
        if (this.unmounted) {
            return;
        }

        const position = results[0];
        const trucks = results[1];
        const userProfile = results[2];

        this.createMap(position);

        this.setState({
            trucks: trucks,
            position: position,
            userProfile: userProfile
        });

        this.makeTruckMarkers();
    },

    createMap: function(position) {
        const options = {
            position: position,
            currentPosition: position
        };

        this.map = mapUtils.createMap(options);

    // TODO: We could use position.coords.accuracy (meters) to draw a circle around the "home" indicator
    // to indicate the accuracy.
    },

    makeTruckMarkers: function(favoritesOnly) {
        if (this.markers && this.markers.length) {
            _.each(this.markers, marker => marker.setMap(null));
        }

        let trucks = this.state.trucks;

        if (favoritesOnly) {
            const liked_trucks = this.state.userProfile.liked_trucks;
            trucks = _.filter(this.state.trucks, truck => {
                return _.includes(liked_trucks, truck.id)
            });
        }

        this.markers = trucks.map(this.makeTruckMarker);
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

        return marker;
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
                <div>
                    <span class="specialsTitle">Specials:</span>
                    <span>${truck.specials}</span>
                </div>
                <a href='/truckInfo/${truck.id}' onclick="return goToUrl('/truckInfo/${truck.id}')">Get Details...</a>
                <a target='_blank' href='https://maps.google.com/?saddr=${this.state.position.coords.latitude},${this.state.position.coords.longitude}&daddr=${truck.latitude},${truck.longitude}'>Get Directions...</a>
            </div>
        `
        });
        this.infowindow.expiration = truck.expiration;
        this.infowindow.open(this.map, marker);
    },

    toggleFavorite: function() {
        this.makeTruckMarkers(this.refs.favoriteChecked.checked);
    },

    render: function() {
        const liked_truck_ids = this.state.userProfile.liked_trucks;
        const liked_trucks = _.filter(this.state.trucks, truck => _.includes(liked_truck_ids, truck.id));
        var favoritesList = liked_trucks.map(function(liked_truck) {
            return (
                <div key={ liked_truck.id }>
                  { liked_truck.truck_name }
                </div>
            )
        })

        return (
            <div>
              <div className="mapContainer">
                <div className="favoritesListCheckbox">
                  <input ref="favoriteChecked" type="checkbox" className="favoriteCheckbox" onChange={ this.toggleFavorite } />
                  <span className="favoriteText">Only my favorites</span>
                </div>
                <div className="mapBox">
                  <div className="map" id="map">
                    Loading...
                  </div>
                </div>
              </div>
              <div className="favoriteContainerList">
                <div className="favoritesListTitle">My Favorite Food Trucks:</div>
                <div className="favoritesList">
                  { favoritesList }
                </div>
              </div>
            </div>
        )
    }
})

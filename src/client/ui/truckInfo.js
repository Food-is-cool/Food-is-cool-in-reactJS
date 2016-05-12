import React from "react";
import { getTruckProfile, getCustomerProfile, saveCustomerProfile } from "api/data";
import mapUtils from "utils/map";
import _ from "lodash";

require("assets/styles/truckInfo.scss");

export default React.createClass({
    getInitialState: function() {
        return {
            companyName: "",
            cuisine: "",
            specails: "",
            email: "",
            phone: "",
            url: "",
            facebook: "",
            twitter: "",
            instagram: "",
            logo: "",
            description: ""
        };
    },

    componentWillMount: function() {
        Promise.all([
            getTruckProfile(this.props.params.truckId),
            getCustomerProfile()
        ]).then(this.updateStateWithProfiles);
    },

    updateStateWithProfiles: function(profiles) {
        const truckProfile = profiles[0];
        const userProfile = profiles[1];

        this.updateStateWithTruckProfile(truckProfile);

        this.setState({
            isFavorite: _.includes(userProfile.liked_trucks, truckProfile.id),
            userProfile: userProfile,
            truckProfile: truckProfile
        });
    },

    updateStateWithTruckProfile: function(truckProfile) {
        if (!truckProfile) {
            return;
        }

        const phone = truckProfile.phone_number || "";

        this.setState({
            companyName: truckProfile.truck_name || "",
            cuisine: truckProfile.cuisine || "",
            specials: truckProfile.specials || "",
            email: truckProfile.email_address || "",
            phone: phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"),
            url: truckProfile.website || "",
            facebook: truckProfile.facebook_page || "",
            twitter: truckProfile.twitter_page || "",
            instagram: truckProfile.instagram_page || "",
            logo: truckProfile.logo_url || "",
            description: truckProfile.truck_description || ""
        });

        const options = {
            position: {
                coords: {
                    latitude: truckProfile.latitude,
                    longitude: truckProfile.longitude
                }
            },
            markers: [
                {
                    latitude: truckProfile.latitude,
                    longitude: truckProfile.longitude,
                    title: truckProfile.truck_name
                }
            ]
        };

        this.map = mapUtils.createMap(options);
    },

    clickFavorite: function(e) {
        e.preventDefault();

        const truck_id = this.state.truckProfile.id;
        let liked_trucks = this.state.userProfile.liked_trucks;
        if (this.state.isFavorite) {
            liked_trucks = _.without(liked_trucks, truck_id);
        } else {
            liked_trucks.push(truck_id);
        }

        const payload = {
            liked_trucks: liked_trucks
        };
        saveCustomerProfile(this.state.userProfile.id, payload);

        this.setState({
            isFavorite: !this.state.isFavorite
        });
    },

    render: function() {
        return (
            <div>
              <div className="truckInfoContainer">
                <div>
                  <img className="infoLogo" src={ this.state.logo } />
                </div>
                <div className="infoContainer">
                  <div className="infoStyle">
                    <span className="companyName">{ this.state.companyName }</span>
                    <span className={ this.state.isFavorite ? "favoriteSelected" : "" } ref="favorite" onClick={ this.clickFavorite } title="Favorite this"><i className="fa fa-thumbs-o-up fa-2x"></i></span>
                    <div className="cuisineInfo">
                      <span><b>Cuisine: </b><span className="infoText">{ this.state.cuisine }</span></span>
                    </div>
                    <div className="info">
                      <span><b>Specials: </b><span className="infoText">{ this.state.specials }</span></span>
                    </div>
                    <div className="info">
                      <span><b>Email: </b><a href={ this.state.email } className="infoText">{ this.state.email }</a></span>
                    </div>
                    <div className="info">
                      <span><b>Phone: </b><span className="infoText">{ this.state.phone }</span></span>
                    </div>
                    <div className="info">
                      <span><b>Description: </b><span className="infoText">{ this.state.description }</span></span>
                    </div>
                    <div className="socialMedia">
                      <span><a href={ this.state.facebook } className="fa fa-facebook-square fa-2x"></a></span>
                      <span><a href={ this.state.twitter } className="fa fa-twitter-square fa-2x"></a></span>
                      <span><a href={ this.state.instagram } className="fa fa-instagram fa-2x"></a></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mapTruckContainer">
                <div className="map" id="map">
                  Loading...
                </div>
              </div>
            </div>
        )
    }
})

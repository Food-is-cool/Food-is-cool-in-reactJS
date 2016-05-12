import React from "react";
import { getTruckProfile } from "api/data";
import mapUtils from "utils/map";
import { notify } from "react-notify-toast";


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
        getTruckProfile(this.props.params.truckId).then(this.updateStateWithProfile);
    },

    updateStateWithProfile: function(profile) {
        if (!profile) {
            return;
        }

        const phone = profile.phone_number || "";

        this.setState({
            companyName: profile.truck_name || "",
            cuisine: profile.cuisine || "",
            specials: profile.specials || "",
            email: profile.email_address || "",
            phone: phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"),
            url: profile.website || "",
            facebook: profile.facebook_page || "",
            twitter: profile.twitter_page || "",
            instagram: profile.instagram_page || "",
            logo: profile.logo_url || "",
            description: profile.truck_description || ""
        });

        const options = {
            position: {
                coords: {
                    latitude: profile.latitude,
                    longitude: profile.longitude
                }
            },
            markers: [
                {
                    latitude: profile.latitude,
                    longitude: profile.longitude,
                    title: profile.truck_name
                }
            ]
        };

        this.map = mapUtils.createMap(options);
    },

    render: function() {
        return (
            <div>
              <div className="truckInfoContainer">
                <div>
                  <img className="infoLogo" src={ this.state.logo } />
                </div>
                <div>
                  <div className="infoStyle">
                    <div className="companyName">
                      { this.state.companyName }
                    </div>
                    <div className="info">
                      <span><b>Cuisine: </b><span className="infoText">{ this.state.cuisine }</span></span>
                    </div>
                    <div className="info">
                      <span><b>Specials: </b><span className="infoText">{ this.state.specials }</span></span>
                    </div>
                    <div className="info">
                      <span><b>Email: </b><span className="infoText">{ this.state.email }</span></span>
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

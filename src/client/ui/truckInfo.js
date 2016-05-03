import React from "react";
import { getTruckProfile } from "api/data";

require("assets/styles/truckInfo.scss");
var img = require("assets/images/lena.png");

export default React.createClass({
    getInitialState: function() {
        return {
            companyName: "",
            cuisine: "",
            email: "",
            phone: "",
            url: "",
            facebook: "",
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
        this.setState({
            companyName: profile.truck_name,
            cuisine: profile.cuisine,
            email: profile.email_address,
            phone: profile.phone_number,
            url: profile.website,
            facebook: profile.facebook_page,
            logo: profile.logo_url,
            description: profile.truck_description
        });
    },
    render: function() {
        return (
            <div className="truckInfoContainer">
              <div>
                <img className="infoLogo" src={ this.state.logo } />
              </div>
              <div>
                <div className="infoStyle">
                  <div className="companyName">
                    { this.state.companyName }
                  </div>
                  <br />
                  <div className="info">
                    { this.state.cuisine }
                  </div>
                  <br />
                  <div className="info">
                    { this.state.email }
                  </div>
                  <br />
                  <div className="info">
                    { this.state.phone }
                  </div>
                  <br />
                  <div className="info">
                    { this.state.url }
                  </div>
                  <br />
                  <div className="info">
                    { this.state.facebook }
                  </div>
                  <br />
                  <div>
                    { this.state.description }
                  </div>
                </div>
              </div>
            </div>
        )
    }
})

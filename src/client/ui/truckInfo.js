import React from "react";
import { getTruckProfile } from "api/data";

require("assets/styles/truckInfo.scss");

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
                    <span><b>Cuisine: </b>{ this.state.cuisine }</span>
                  </div>
                  <br />
                  <div className="info">
                    <span><b>Email: </b>{ this.state.email }</span>
                  </div>
                  <br />
                  <div className="info">
                    <span><b>Phone: </b>{ this.state.phone }</span>
                  </div>
                  <br />
                  <div className="info">
                    <span><b>Website Address: </b>{ this.state.url }</span>
                  </div>
                  <br />
                  <div className="info">
                    <span><b>facebook: </b>{ this.state.facebook }</span>
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

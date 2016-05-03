import React from "react";
import { saveTruckProfile, getTruckProfile } from "api/data";

require("assets/styles/truckProfile.scss");

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
        getTruckProfile().then(this.updateStateWithProfile);
    },

    updateStateWithProfile: function(profile) {
        if (!profile) {
            return;
        }

        this.setState({
            id: profile.id,
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

    handleChange: function() {
        this.setState({
            companyName: this.refs.companyName.value,
            cuisine: this.refs.cuisine.value,
            email: this.refs.email.value,
            phone: this.refs.phone.value,
            url: this.refs.url.value,
            facebook: this.refs.facebook.value,
            logo: this.refs.logo.value,
            description: this.refs.description.value
        });
    },

    onSubmit: function() {
        const payload = {
            truck_name: this.state.companyName,
            cuisine: this.state.cuisine,
            email_address: this.state.email,
            phone_number: this.state.phone,
            website: this.state.url,
            facebook_page: this.state.facebook,
            logo_url: this.state.logo,
            truck_description: this.state.description
        };

        saveTruckProfile(this.state.id, payload);
    },

    render: function() {
        return (
            <div className="truckProfile">
              <form className="truckForm">
                <div className="profileInput">
                  <input ref="companyName" placeholder="Company Name" className="input" type="text" name="companyName" value={ this.state.companyName } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="profileInput">
                  <input ref="cuisine" placeholder="Cuisine" className="input" type="text" name="cuisine" value={ this.state.cuisine } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="profileInput">
                  <input ref="email" placeholder="Email" className="input" type="email" name="email" value={ this.state.email } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="profileInput">
                  <input ref="phone" placeholder="Phone" className="input" type="tel" name="phone" value={ this.state.phone } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="profileInput">
                  <input ref="url" placeholder="Web Address" className="input" type="url" name="url" value={ this.state.url } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="profileInput">
                  <input ref="facebook" placeholder="facebook" className="input" type="url" name="facebook" value={ this.state.facebook } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="profileInput">
                  <input ref="logo" placeholder="Logo" className="input" type="text" name="logo" value={ this.state.logo } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="profileInput">
                  <textarea ref="description" placeholder="Description" className="profileText" rows="4" cols="50" value={ this.state.description } onChange={ this.handleChange }></textarea>
                  <br />
                </div>
                <button className="profileButton" type="button" onClick={ this.onSubmit }>Submit</button>
              </form>
            </div>
        )
    }
})

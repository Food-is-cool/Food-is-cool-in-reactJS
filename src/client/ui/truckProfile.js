import React from "react";
import { saveTruckProfile, getCurrentTruckProfile } from "api/data";
import MaskedInput from "react-maskedinput";
import { emailRegEx, urlRegEx } from "utils/regEx";
import { notify } from "react-notify-toast";


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
            twitter: "",
            instagram: "",
            logo: "",
            description: ""
        };
    },

    componentWillMount: function() {
        getCurrentTruckProfile().then(this.updateStateWithProfile);
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
            twitter: profile.twitter_page,
            instagram: profile.instagram_page,
            logo: profile.logo_url,
            description: profile.truck_description
        });
    },

    handleChange: function() {
        this.setState({
            companyName: this.refs.companyName.value,
            cuisine: this.refs.cuisine.value,
            email: this.refs.email.value,
            phone: this.refs.phone.input.value,
            url: this.refs.url.value,
            facebook: this.refs.facebook.value,
            twitter: this.refs.twitter.value,
            innstagram: this.refs.instagram.value,
            logo: this.refs.logo.value,
            description: this.refs.description.value
        });
    },

    onSubmit: function() {
        if (!this.state.companyName) {
            return notify.show("Please enter your Company name!", "error");
        }

        if (!this.state.cuisine) {
            return notify.show("Please enter a type of Cuisine!", "error");
        }

        if (!emailRegEx.test(this.state.email)) {
            return notify.show("Please enter a valid email address.", "error");
        }

        if (!this.state.phone || this.state.phone.indexOf("_") >= 0) {
            return notify.show("Please enter a full 10-digit phone number", "error");
        }

        if (!urlRegEx.test(this.state.url)) {
            return notify.show("Please enter a valid url address.", "error");
        }

        if (!urlRegEx.test(this.state.logo)) {
            return notify.show("Please enter a valid logo url address.", "error");
        }

        if (!this.state.description) {
            return notify.show("Please enter your Company's description!", "error");
        }

        const payload = {
            truck_name: this.state.companyName,
            cuisine: this.state.cuisine,
            email_address: this.state.email,
            phone_number: this.state.phone.replace(/\D/g, ""),
            website: this.state.url,
            facebook_page: this.state.facebook,
            twitter_page: this.state.twitter,
            instagram_page: this.state.instagram,
            logo_url: this.state.logo,
            truck_description: this.state.description
        };

        saveTruckProfile(this.state.id, payload)
            .then(function() {
                notify.show("Your profile has been Saved!", "success");
            })
            .catch(function(err) {
                notify.show("Did not save!", "error");
            });
    },

    render: function() {
        return (
            <div className="truckProfile">
              <form className="truckForm">
                <div className="profileInput">
                  <input ref="companyName" placeholder="Company Name" className="input" type="text" name="companyName" value={ this.state.companyName } onChange={ this.handleChange } />
                </div>
                <div className="profileInput">
                  <input ref="cuisine" placeholder="Cuisine" className="input" type="text" name="cuisine" value={ this.state.cuisine } onChange={ this.handleChange } />
                </div>
                <div className="profileInput">
                  <input ref="email" placeholder="Email" className="input" type="email" name="email" value={ this.state.email } onChange={ this.handleChange } />
                </div>
                <div className="profileInput">
                  <MaskedInput mask="(111) 111-1111" ref="phone" placeholder="Phone" className="input" type="tel" name="phone" value={ this.state.phone } onChange={ this.handleChange }
                  />
                </div>
                <div className="profileInput">
                  <input ref="url" placeholder="Web Address" className="input" type="url" name="url" value={ this.state.url } onChange={ this.handleChange } />
                </div>
                <div className="profileInput">
                  <input ref="facebook" placeholder="facebook" className="input" type="url" name="facebook" value={ this.state.facebook } onChange={ this.handleChange } />
                </div>
                <div className="profileInput">
                  <input ref="twitter" placeholder="twitter" className="input" type="url" name="twitter" value={ this.state.twitter } onChange={ this.handleChange } />
                </div>
                <div className="profileInput">
                  <input ref="instagram" placeholder="Instagram" className="input" type="url" name="instagram" value={ this.state.instagram } onChange={ this.handleChange } />
                </div>
                <div className="profileInput">
                  <input ref="logo" placeholder="Logo" className="input" type="text" name="logo" value={ this.state.logo } onChange={ this.handleChange } />
                </div>
                <div className="profileInput">
                  <textarea ref="description" placeholder="Description" className="profileText" rows="4" cols="50" value={ this.state.description } onChange={ this.handleChange }></textarea>
                </div>
                <button className="profileButton" type="button" onClick={ this.onSubmit }>Submit</button>
              </form>
              <div className="truckLabels">
                <div>
                  <label className="companyLabels">Company Name: </label>
                </div>
                <div>
                  <label className="cuisineLabels">Cuisine: </label>
                </div>
                <div>
                  <label className="emailLabels">Email: </label>
                </div>
                <div>
                  <label className="phoneLabels">Phone: </label>
                </div>
                <div>
                  <label className="webAddressLabels">Web Address: </label>
                </div>
                <div>
                  <label className="facebookLabels">facebook: </label>
                </div>
                <div>
                  <label className="twitterLabels">twitter: </label>
                </div>
                <div>
                  <label className="instagramLabels">Instagram: </label>
                </div>
                <div>
                  <label className="logoLabels">Logo: </label>
                </div>
                <div>
                  <label className="descriptionLabels">Description: </label>
                </div>
              </div>
            </div>
        )
    }
})

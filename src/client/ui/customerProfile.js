import React from "react";
import { getCustomerProfile, saveCustomerProfile } from "api/data";
import { notify } from "react-notify-toast";
import MaskedInput from "react-maskedinput";
import { emailRegEx } from "utils/regEx";

require("assets/styles/customerProfile.scss");

export default React.createClass({
    getInitialState: function() {
        return {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipcode: "",
            emailOpt: false,
            textOpt: false
        };
    },

    componentWillMount: function() {
        getCustomerProfile().then(this.updateStateWithProfile);
    },

    updateStateWithProfile: function(profile) {
        if (!profile) {
            return;
        }

        this.setState({
            id: profile.id,
            name: profile.customer_name || "",
            email: profile.email_address || "",
            phone: profile.mobile_number || "",
            address: profile.street_address || "",
            city: profile.city || "",
            state: profile.state || "",
            zipcode: profile.zipcode || "",
            emailOpt: profile.want_emails || false,
            textOpt: profile.want_texts || false
        });
    },

    handleChange: function() {
        this.setState({
            name: this.refs.name.value,
            email: this.refs.email.value,
            phone: this.refs.phone.input.value,
            address: this.refs.address.value,
            city: this.refs.city.value,
            state: this.refs.state.input.value,
            zipcode: this.refs.zipcode.input.value,
            emailOpt: this.refs.emailOpt.checked,
            textOpt: this.refs.textOpt.checked
        });
    },

    onSubmit: function() {
        if (!this.state.name) {
            return notify.show("Please enter your name!", "error");
        }

        if (!emailRegEx.test(this.state.email)) {
            return notify.show("Please enter a valid email address.", "error");
        }

        if (!this.state.phone || this.state.phone.indexOf("_") >= 0) {
            return notify.show("Please enter a full 10-digit phone number", "error");
        }

        if (!this.state.address) {
            return notify.show("Please enter your street address!", "error");
        }

        if (!this.state.city) {
            return notify.show("Please enter your city!", "error");
        }

        if (!this.state.state || this.state.state.indexOf("_") >= 0) {
            return notify.show("Please enter a state.", "error");
        }

        if (!this.state.zipcode || this.state.zipcode.indexOf("_") >= 0) {
            return notify.show("Please enter a Zipcode.", "error");
        }

        const payload = {
            customer_name: this.state.name,
            email_address: this.state.email,
            mobile_number: this.state.phone.replace(/\D/g, ""),
            street_address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            want_emails: this.state.emailOpt,
            want_texts: this.state.textOpt
        };

        saveCustomerProfile(this.state.id, payload)
            .then(function() {
                notify.show("Your profile has been Saved!", "success");
            })
            .catch(function(err) {
                notify.show("Did not save!", "error");
            });
    },

    render: function() {
        return (
            <div className="customerContainer">
              <form>
                <div className="CustomerProfileInput">
                  <span className="CustomerLabel">Name:</span>
                  <br />
                  <input ref="name" className="customerInput" type="text" name="name" value={ this.state.name } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="CustomerProfileInput">
                  <span className="CustomerLabel">Email:</span>
                  <br />
                  <input ref="email" className="customerInput" type="email" name="email" value={ this.state.email } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="CustomerProfileInput">
                  <span className="CustomerLabel">Phone:</span>
                  <br />
                  <MaskedInput mask="(111) 111-1111" ref="phone" className="customerInput" type="tel" name="phone" value={ this.state.phone } onChange={ this.handleChange } />
                  <br />
                </div>
                <div></div>
                <div className="CustomerProfileInput">
                  <span className="CustomerLabel">Address:</span>
                  <br />
                  <input ref="address" className="customerInput" type="text" name="address" value={ this.state.address } onChange={ this.handleChange } />
                  <br />
                </div>
                <div className="cszBox">
                  <div className="CustomerProfileInput">
                    <span className="CustomerLabel">City:</span>
                    <br />
                    <input ref="city" className="customerInputCity" placeholder="Beverly Hiils" type="text" name="city" value={ this.state.city } onChange={ this.handleChange } />
                    <br />
                  </div>
                  <div className="CustomerProfileInput">
                    <span className="CustomerLabel">State:</span>
                    <br />
                    <MaskedInput mask="AA" placeholder="CA" ref="state" className="customerInputState" type="text" name="state" value={ this.state.state } onChange={ this.handleChange }
                    />
                    <br />
                  </div>
                  <div className="CustomerProfileInput">
                    <span className="CustomerLabel">Zip Code:</span>
                    <br />
                    <MaskedInput mask="11111" placeholder="90210" ref="zipcode" className="customerInputZip" type="text" name="zipcode" value={ this.state.zipcode } onChange={ this.handleChange }
                    />
                    <br />
                  </div>
                </div>
                <div className="checkboxEmailCustomer">
                  <input ref="emailOpt" className="CustomerProfileEmailCheck" type="checkbox" name="emailOpt" checked={ this.state.emailOpt } onChange={ this.handleChange } />
                  <label className="checkLabel">Opt in to recieve emails of specials and Food Trucks in your area?</label>
                </div>
                <br />
                <div className="checkboxTextCustomer">
                  <input ref="textOpt" className="CustomerProfileTextCheck" type="checkbox" name="textOpt" checked={ this.state.textOpt } onChange={ this.handleChange } />
                  <label className="checkLabel">Opt in to recieve texts of specials and Food Trucks in your area?</label>
                </div>
                <br />
                <button className="customerSubmit" type="button" onClick={ this.onSubmit }>Submit</button>
              </form>
              <div className="arrowgray"></div>
              <div className="recgray"></div>
              <div className="arrow"></div>
              <div className="rec">Please enter the address that you will most likely be during lunch/Dinner.</div>
            </div>
            );
    }
})

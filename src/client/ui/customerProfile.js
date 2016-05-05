import React from "react";
import { getCustomerProfile, saveCustomerProfile } from "api/data";
import StatesDropdown from "ui/statesDropdown";

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
        this.setState({
            id: profile.id,
            name: profile.customer_name,
            email: profile.email_address,
            phone: profile.mobile_number,
            address: profile.street_address,
            city: profile.city,
            state: profile.state,
            zipcode: profile.zipcode,
            emailOpt: profile.want_emails,
            textOpt: profile.want_texts
        });
    },

    handleChange: function() {
        this.setState({
            name: this.refs.name.value,
            email: this.refs.email.value,
            phone: this.refs.phone.value,
            address: this.refs.address.value,
            city: this.refs.city.value,
            state: this.refs.state.value,
            zipcode: this.refs.zipcode.value,
            emailOpt: this.refs.emailOpt.checked,
            textOpt: this.refs.textOpt.checked
        });
    },

    onSubmit: function() {
        const payload = {
            customer_name: this.state.name,
            email_address: this.state.email,
            mobile_number: this.state.phone,
            street_address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            want_emails: this.state.emailOpt,
            want_texts: this.state.textOpt
        };

        saveCustomerProfile(this.state.id, payload);
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
                  <input ref="phone" className="customerInput" type="tel" name="phone" value={ this.state.phone } onChange={ this.handleChange } />
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
                    <input ref="city" className="customerInputCity" type="text" name="city" value={ this.state.city } onChange={ this.handleChange } />
                    <br />
                  </div>
                  <div className="CustomerProfileInput">
                    <span className="CustomerLabel">State:</span>
                    <br />
                    <input ref="state" className="customerInputState" type="text" name="state" value={ this.state.state } onChange={ this.handleChange } />
                    <br />
                  </div>
                  <div className="CustomerProfileInput">
                    <span className="CustomerLabel">Zip Code:</span>
                    <br />
                    <input ref="zipcode" className="customerInputZip" type="text" name="zipcode" value={ this.state.zipcode } onChange={ this.handleChange } />
                    <br />
                  </div>
                </div>
                <input ref="emailOpt" className="CustomerProfileCheck" type="checkbox" name="emailOpt" checked={ this.state.emailOpt } onChange={ this.handleChange } />
                <label className="checkLabel">Opt in to recieve emails of specials and Food Trucks in your area?</label>
                <br />
                <input ref="textOpt" className="CustomerProfileCheck" type="checkbox" name="textOpt" checked={ this.state.textOpt } onChange={ this.handleChange } />
                <label className="checkLabel">Opt in to recieve texts of specials and Food Trucks in your area?</label>
                <br />
                <button className="customerSubmit" type="button" onClick={ this.onSubmit }>Submit</button>
                <StatesDropdown />
              </form>
              <div className="arrowgray"></div>
              <div className="recgray"></div>
              <div className="arrow"></div>
              <div className="rec">Please enter the address that you will most likely be during lunch/Dinner.</div>
            </div>
            );
    }
})

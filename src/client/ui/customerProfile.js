import React from 'react';
import { currentUserProfile, getTruck } from 'api/data';

require('assets/styles/customerProfile.scss');

export default React.createClass({
  render: function() {
    return (
      <div className="customerContainer">
        <form>
          <div className="CustomerProfileInput">
            <span className="label">Name:</span>
            <br />
            <input className="customerInput" type="text" name="name" />
            <br />
          </div>
          <div className="CustomerProfileInput">
            <span className="label">Email:</span>
            <br />
            <input className="customerInput" type="email" name="Email" />
            <br />
          </div>
          <div className="CustomerProfileInput">
            <span className="label">Phone:</span>
            <br />
            <input className="customerInput" type="tel" name="Phone" />
            <br />
          </div>
          <div></div>
          <div className="CustomerProfileInput">
            <span className="label">Address:</span>
            <br />
            <input className="customerInput" type="text" name="Address" />
            <br />
          </div>
          <div className="cszBox">
            <div className="CustomerProfileInput">
              <span className="label">City:</span>
              <br />
              <input className="customerInputCity" type="text" name="City" />
              <br />
            </div>
            <div className="CustomerProfileInput">
              <span className="label">State:</span>
              <br />
              <input className="customerInputState" type="text" name="State" />
              <br />
            </div>
            <div className="CustomerProfileInput">
              <span className="label">Zip Code:</span>
              <br />
              <input className="customerInputZip" type="text" name="ZipCode" />
              <br />
            </div>
          </div>
          <input className="CustomerProfileCheck" type="checkbox" name="emailOpt" value="emailOpt" />
          <label className="checkLabel">Opt in to recieve emails of specials and Food Trucks in your area?</label>
          <br />
          <input className="CustomerProfileCheck" type="checkbox" name="textOpt" value="textOpt" />
          <label className="checkLabel">Opt in to recieve texts of specials and Food Trucks in your area?</label>
          <br />
          <button className="customerSubmit" type="button">Submit</button>
        </form>
        <div className="arrowgray"></div>
        <div className="recgray"></div>
        <div className="arrow"></div>
        <div className="rec">Please enter the address that you will most likely be during lunch/Dinner.</div>
      </div>
    )
  }
})

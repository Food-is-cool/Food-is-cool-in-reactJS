import React from "react";
import { saveTruckProfile, getCurrentPosition, getCurrentTruckProfile } from "api/data";
import { notify } from "react-notify-toast";

require("assets/styles/whereWhen.scss");

export default React.createClass({
    getInitialState: function() {
        return {
            selectedHours: "",
            specials: ""
        };
    },

    componentWillMount: function() {
        getCurrentTruckProfile().then(this.handleTruckInfo);
    },

    handleTruckInfo: function(truck) {
        this.setState({
            id: truck.id,
            specials: truck.specials || ""
        });
    },

    getButtonClasses: function(hours) {
        const classes = ["setTime"];
        if (this.state.selectedHours === hours) {
            classes.push("selectedTime");
        }
        return classes.join(" ");
    },

    handleTimeClick: function(e) {
        e.preventDefault();

        this.setState({
            selectedHours: parseInt(e.target.dataset.hours)
        });
    },

    onSubmit: function(e) {
        e.preventDefault();

        let expiration = new Date();
        expiration.setHours(expiration.getHours() + this.state.selectedHours);

        const self = this;

        getCurrentPosition().then(function(position) {
            const payload = {
                expiration: expiration,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                specials: self.refs.specials.value
            };

            saveTruckProfile(self.state.id, payload)
                .then(function() {
                    notify.show("Saved!", "success");
                })
                .catch(function(err) {
                    notify.show("Did not save!", "error");
                });
        });
    },

    render: function() {
        return (
            <div className="wwContainer">
              <form className="whereWhenContainer">
                <div className="timeTitle">How long will you be at this location?</div>
                <div className="flexTime">
                  <button data-hours="2" className={ this.getButtonClasses(2) } onClick={ this.handleTimeClick }>2 Hours</button>
                  <button data-hours="4" className={ this.getButtonClasses(4) } onClick={ this.handleTimeClick }>4 Hours</button>
                  <button data-hours="6" className={ this.getButtonClasses(6) } onClick={ this.handleTimeClick }>6 Hours</button>
                  <button data-hours="8" className={ this.getButtonClasses(8) } onClick={ this.handleTimeClick }>8 Hours</button>
                  <button data-hours="10" className={ this.getButtonClasses(10) } onClick={ this.handleTimeClick }>10 Hours</button>
                  <button data-hours="12" className={ this.getButtonClasses(12) } onClick={ this.handleTimeClick }>12 Hours</button>
                </div>
                <span className="specialText">Any Specials?</span>
                <input ref="specials" className="specials" type="text" value={ this.state.specials } placeholder="Enter any specials here!"></input>
                <div className="locationTitle">Click to set location!</div>
                <button className="setLocation" onClick={ this.onSubmit }>Set Location</button>
              </form>
            </div>
        )
    }
})

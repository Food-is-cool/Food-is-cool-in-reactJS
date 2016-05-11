import React from "react";
import { saveTruckProfile, getCurrentPosition, getCurrentTruckProfile } from "api/data";
import { notify } from "react-notify-toast";
import moment from "moment";

require("assets/styles/whereWhen.scss");

export default React.createClass({
    getInitialState: function() {
        return {
            selectedMinutes: 0,
            specials: ""
        };
    },

    componentWillMount: function() {
        getCurrentTruckProfile().then(this.handleTruckInfo);
    },

    handleTruckInfo: function(truck) {
        const selectedMinutes = moment(truck.expiration).diff(moment(), "minutes");

        this.setState({
            id: truck.id,
            specials: truck.specials || "",
            selectedMinutes: selectedMinutes
        });
    },

    getButtonClasses: function(minutes) {
        const classes = ["setTime"];
        if (this.state.selectedMinutes === minutes) {
            classes.push("selectedTime");
        }
        return classes.join(" ");
    },

    handleTimeClick: function(e) {
        e.preventDefault();

        this.setState({
            selectedMinutes: parseInt(e.target.dataset.minutes)
        });
    },

    onSubmit: function(e) {
        e.preventDefault();

        const expiration = moment().add(this.state.selectedMinutes, "minutes");

        const self = this;

        getCurrentPosition().then(function(position) {
            const payload = {
                expiration: expiration.toDate(),
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

    handleSlider: function() {
        this.setState({
            selectedMinutes: parseInt(this.refs.slider.value)
        });
    },

    handleSpecials: function() {
        this.setState({
            specials: this.refs.specials.value
        });
    },

    getTimeString: function() {
        if (this.state.selectedMinutes < 0) {
            return "0 hours";
        }

        const hours = Math.floor(this.state.selectedMinutes / 60);
        const minutes = this.state.selectedMinutes % 60;

        if (minutes === 0) {
            return `${hours} hours`;
        }

        return `${hours} hours, ${minutes} minutes`;
    },

    render: function() {
        return (
            <div className="wwContainer">
              <form className="whereWhenContainer">
                <div className="timeTitle">How long will you be at this location?</div>
                <input className="timeSlider" ref="slider" onChange={ this.handleSlider } type="range" min="0" max="720" step="15" value={ this.state.selectedMinutes } />
                <span className="sliderTime">{ this.getTimeString() }</span>
                <div className="flexTime">
                  <button data-minutes="120" className={ this.getButtonClasses(120) } onClick={ this.handleTimeClick }>2 Hours</button>
                  <button data-minutes="240" className={ this.getButtonClasses(240) } onClick={ this.handleTimeClick }>4 Hours</button>
                  <button data-minutes="360" className={ this.getButtonClasses(360) } onClick={ this.handleTimeClick }>6 Hours</button>
                  <button data-minutes="480" className={ this.getButtonClasses(480) } onClick={ this.handleTimeClick }>8 Hours</button>
                  <button data-minutes="600" className={ this.getButtonClasses(600) } onClick={ this.handleTimeClick }>10 Hours</button>
                  <button data-minutes="720" className={ this.getButtonClasses(720) } onClick={ this.handleTimeClick }>12 Hours</button>
                </div>
                <div className="specialText">Any Specials?</div>
                <input ref="specials" className="specials" type="text" value={ this.state.specials } onChange={ this.handleSpecials } placeholder="Enter any specials here!"></input>
                <div className="locationTitle">Click to set location!</div>
                <button className="setLocation" onClick={ this.onSubmit }>Set Location</button>
              </form>
            </div>
        )
    }
})

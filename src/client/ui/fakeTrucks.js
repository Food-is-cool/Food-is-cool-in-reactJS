import React from "react";
import { getAllTrucks, saveTruckProfile } from "api/data";
import StatesDropdown from "ui/statesDropdown";

require("assets/styles/customerProfile.scss");

const locations = [
    {
        latitude: 36.255530,
        longitude: -115.288492
    },
    {
        latitude: 36.237384,
        longitude: -115.291366
    },
    {
        latitude: 36.260676,
        longitude: -115.269751
    },
    {
        latitude: 36.272446,
        longitude: -115.310956
    }
];

export default React.createClass({
    getInitialState: function() {
        return {
        };
    },

    onSubmit: function(e) {
        e.preventDefault();

        getAllTrucks()
            .then(function(trucks) {
                trucks.forEach(function(truck) {
                    let expiration = new Date();
                    expiration.setHours(expiration.getHours() + 4);

                    const location = locations[0];

                    const payload = {
                        expiration: expiration,
                        latitutde: location.latitude,
                        longitude: location.longitude
                    };
                    debugger;
                    saveTruckProfile(truck.id, payload);
                });
            });
    },

    render: function() {
        return (
            <div className="fakeTruckContainer">
              <button className="fakeTruckSubmit" type="button" onClick={ this.onSubmit }>Update the trucks</button>
            </div>
            );
    }
})

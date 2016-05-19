import React from "react";
import _ from "lodash";
import { getAllTrucks, saveTruckProfile } from "api/data";

require("assets/styles/customerProfile.scss");

const truckData = [
    {
        id: 3,
        expiration: "",
        latitude: 36.158233,
        longitude: -115.149290
    },
    {
        id: 4,
        expiration: "",
        latitude: 36.182796,
        longitude: -115.131931
    },
    {
        id: 2,
        expiration: "",
        latitude: 36.159515,
        longitude: -115.203986
    },
    {
        id: 1,
        expiration: "",
        latitude: 36.155496,
        longitude:  -115.149269
    },
    {
        id: 5,
        expiration: "",
        latitude: 36.15,
        longitude: -115.14
    },
    {
        id: 6,
        expiration: "",
        latitude: 36.16,
        longitude: -115.14
    },
    {
        id: 7,
        expiration: "",
        latitude: 36.14,
        longitude: -115.34
    },
    {
        id: 8,
        expiration: "",
        latitude: 36.13,
        longitude: -115.13
    },
    {
        id: 9,
        expiration: "",
        latitude: 36.144909,
        longitude: -115.158027
    },
    {
        id: 10,
        expiration: "",
        latitude: 36.1,
        longitude: -115.172
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
                trucks.forEach(function(truck, index) {
                    const data = _.find(truckData, t => t.id === truck.id);

                    const payload = _.omit(data, "id");
                    payload.expiration = new Date();
                    payload.expiration.setHours(payload.expiration.getHours() + 4);

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

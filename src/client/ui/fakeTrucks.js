import React from "react";
import _ from "lodash";
import { getAllTrucks, saveTruckProfile } from "api/data";

require("assets/styles/customerProfile.scss");

const truckData = [
    {
        id: 3,
        expiration: "2",
        latitude: 36.159182,
        longitude: -115.152679
    },
    {
        id: 4,
        expiration: "3",
        latitude: 36.25553,
        longitude: -115.288492
    },
    {
        id: 2,
        expiration: "3",
        latitude: 36.237384,
        longitude: -115.291366
    },
    {
        id: 1,
        expiration: "",
        latitude: 36.1588375,
        longitude: -115.1524814
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
        latitude: 35.9917,
        longitude: -114.99
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
                    const data = _.find(truckData, "id", truck.id);

                    const payload = _.omit(data, "id");
                    payload.expiration = new Date();
                    payload.expiration.setHours(expiration.getHours() + 4);

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

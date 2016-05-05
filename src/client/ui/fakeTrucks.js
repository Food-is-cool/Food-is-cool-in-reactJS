import React from "react";
import { getAllTrucks, saveTruckProfile } from "api/data";

require("assets/styles/customerProfile.scss");

const truckData = [
    {
        truck_name: "Gyro King",
        cuisine: "Greek",
        phone_number: "702-222-2222",
        email_address: "gyroking@gmail.com",
        website: "http://www.gyroking.com",
        facebook_page: "http://www.facebook.com",
        logo_url: "http://roaminghunger.com/img/trucks/original/51e98547-712c-4c63-a834-6e3046204482.png",
        truck_description: "The best Gyro in the valley.  You will not be dissappointed",
        expiration: "",
        latitude: 36.159182,
        longitude: -115.152679
    },
    {
        truck_name: "Burgers Amore",
        cuisine: "Burgers",
        phone_number: "111-111-1111",
        email_address: "burgersamore@yahoo.com",
        website: "http://www.burgersamore.com",
        facebook_page: "http://www.facebook.com",
        logo_url: "http://bloximages.chicago2.vip.townnews.com/eastvalleytribune.com/content/tncms/assets/v3/editorial/6/d3/6d30d898-c112-11e4-800d-bb2845a7b67f/54f4ba1154a98.image.jpg",
        truck_description: "Best burgers in the Las Vegas.  Voted Best burger in Las Vegas 2017",
        expiration: "",
        latitude: 36.255530,
        longitude: -115.288492
    },
    {
        truck_name: "Sushi Loca",
        cuisine: "Japanese",
        phone_number: "702-111-1111",
        email_address: "sushiloca@hotmail.com",
        website: "http://www.sushiloca.com",
        facebook_page: "http://www.facebook.com",
        logo_url: "http://roaminghunger.com/img/trucks/original/4e1508c4-5aa4-4deb-8a61-581546204482.jpg",
        truck_description: "Let us roll it.  Come hungery leave satisfied",
        expiration: "",
        latitude: 36.237384,
        longitude: -115.291366
    },
    {
        truck_name: "Pho Sizzle",
        cuisine: "Vietnamese",
        phone_number: "702-333-3344",
        email_address: "phosizzle@hotmail.com",
        website: "http://www.phosizzle.com",
        logo_url: "http://www.penbaypilot.com/sites/default/files/2014/05/field/image/IMG_5703.JPG",
        facebook_page: "http://www.facebook.com",
        truck_description: "Enjoy Pho to go! Pho Sizzle",
        expiration: "",
        latitude: 36.260676,
        longitude: -115.269751
    },
    {
        truck_name: "Sin City Dogs",
        cuisine: "American Fast Food",
        phone_number: "702-555-5454",
        email_address: "sincitydogs@gmail.com",
        website: "http://www.sincitydogs.com",
        facebook_page: "http://www.facebook.com",
        logo_url: "http://thesceneisdead.com/wp-content/uploads/2014/06/463928_246146048857118_2063820098_o-1024x682.jpg",
        truck_description: "Sinfully good.  Over 30 different kinds of dogs!",
        expiration: "",
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
                trucks.forEach(function(truck, index) {
                    let expiration = new Date();
                    expiration.setHours(expiration.getHours() + 4);

                    const data = truckData[index % truckData.length];

                    const payload = {
                        truck_name: data.truck_name,
                        cuisine: data.cuisine,
                        expiration: expiration,
                        latitude: data.latitude,
                        longitude: data.longitude
                    };
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

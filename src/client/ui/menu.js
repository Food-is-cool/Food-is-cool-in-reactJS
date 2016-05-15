import React from "react";
import { getTruckProfile } from "api/data";
import _ from "lodash";

require("assets/styles/menu.scss");

var placeholder = require("assets/images/foodtruckplaceholder.png");

export default React.createClass({
    getInitialState: function() {
        return {
        }
    },
    componentWillMount: function() {
        getTruckProfile(this.props.params.truckId)
            .then(this.updateStateWithTruckProfile);
    },

    updateStateWithTruckProfile: function(truckProfile) {
        if (!truckProfile) {
            return;
        }

        let menuItems = _.times(10, n => {
            debugger;
            return {
                name: truckProfile[`menu_item_${n + 1}`],
                price: truckProfile[`item_${n + 1}_price`],
                image: truckProfile[`item_${n + 1}_image`]
            };
        });

        menuItems = _.filter(menuItems, "name");

        this.setState({
            menuItems
        });
    },

    getMenuImageUrl: function(url) {
        if (url) {
            return url;
        }

        return placeholder;
    },

    buildMenuItems: function() {
        if (!this.state.menuItems) {
            return;
        }

        if (this.state.menuItems.length === 0) {
            return (
                <div>
                  <img src={ placeholder } />
                  <div className="placeholder">No menu items</div>
                </div>
                );
        }

        return this.state.menuItems.map(item => {
            return (
                <div className="menuCards">
                  <img className="menuImageInfo" src={ this.getMenuImageUrl(item.image) } />
                  <div className="imageInfoCard">
                    <span className="infoText">{ item.name }</span>
                    <span className="infoTextPrice">{ item.price ? `$${item.price}` : "" }</span>
                  </div>
                </div>
            )
        })
    },

    render: function() {
        return (
            <div className="menuContainerInfo">
              { this.buildMenuItems() }
            </div>
        )
    }
})

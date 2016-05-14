import React from "react";
import { getTruckProfile } from "api/data";
import _ from "lodash";

require("assets/styles/menu.scss");

export default React.createClass({
    getInitialState: function() {
        return {
            menuItem1: "",
            menuItem1: "",
            menuItem2: "",
            menuItem3: "",
            menuItem4: "",
            menuItem5: "",
            menuItem6: "",
            menuItem7: "",
            menuItem8: "",
            menuItem9: "",
            menuItem10: "",
            menuPrice1: "",
            menuPrice2: "",
            menuPrice3: "",
            menuPrice4: "",
            menuPrice5: "",
            menuPrice6: "",
            menuPrice7: "",
            menuPrice8: "",
            menuPrice9: "",
            menuPrice10: "",
            menuImage1: "",
            menuImage2: "",
            menuImage3: "",
            menuImage4: "",
            menuImage5: "",
            menuImage6: "",
            menuImage7: "",
            menuImage8: "",
            menuImage9: "",
            menuImage10: ""
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

        this.setState({
            menuItem1: truckProfile.menu_item_1 || "",
            menuItem2: truckProfile.menu_item_2 || "",
            menuItem3: truckProfile.menu_item_3 || "",
            menuItem4: truckProfile.menu_item_4 || "",
            menuItem5: truckProfile.menu_item_5 || "",
            menuItem6: truckProfile.menu_item_6 || "",
            menuItem7: truckProfile.menu_item_7 || "",
            menuItem8: truckProfile.menu_item_8 || "",
            menuItem9: truckProfile.menu_item_9 || "",
            menuItem10: truckProfile.menu_item_10 || "",
            menuPrice1: truckProfile.item_1_price || "",
            menuPrice2: truckProfile.item_2_price || "",
            menuPrice3: truckProfile.item_3_price || "",
            menuPrice4: truckProfile.item_4_price || "",
            menuPrice5: truckProfile.item_5_price || "",
            menuPrice6: truckProfile.item_6_price || "",
            menuPrice7: truckProfile.item_7_price || "",
            menuPrice8: truckProfile.item_8_price || "",
            menuPrice9: truckProfile.item_9_price || "",
            menuPrice10: truckProfile.item_10_price || "",
            menuImage1: truckProfile.item_1_image || "",
            menuImage2: truckProfile.item_2_image || "",
            menuImage3: truckProfile.item_3_image || "",
            menuImage4: truckProfile.item_4_image || "",
            menuImage5: truckProfile.item_5_image || "",
            menuImage6: truckProfile.item_6_image || "",
            menuImage7: truckProfile.item_7_image || "",
            menuImage8: truckProfile.item_8_image || "",
            menuImage9: truckProfile.item_9_image || "",
            menuImage10: truckProfile.item_10_image || ""
        });
    },

    render: function() {
        return (
            <div className="menuContainerInfo">
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage1 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem1 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice1 }</span>
                </div>
              </div>
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage2 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem2 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice2 }</span>
                </div>
              </div>
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage3 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem3 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice3 }</span>
                </div>
              </div>
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage4 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem4 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice4 }</span>
                </div>
              </div>
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage5 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem5 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice5 }</span>
                </div>
              </div>
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage6 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem6 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice6 }</span>
                </div>
              </div>
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage7 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem7 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice7 }</span>
                </div>
              </div>
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage8 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem8 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice8 }</span>
                </div>
              </div>
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage9 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem9 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice9 }</span>
                </div>
              </div>
              <div className="menuCards">
                <img className="menuImageInfo" src={ this.state.menuImage10 } />
                <div className="imageInfoCard">
                  <span className="infoText">{ this.state.menuItem10 }</span>
                  <span className="infoTextPrice">${ this.state.menuPrice10 }</span>
                </div>
              </div>
            </div>
        )
    }
})

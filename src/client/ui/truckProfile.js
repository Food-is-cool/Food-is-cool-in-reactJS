import React from "react";
import { saveTruckProfile, getCurrentTruckProfile } from "api/data";
import MaskedInput from "react-maskedinput";
import { emailRegEx, urlRegEx } from "utils/regEx";
import { notify } from "react-notify-toast";


require("assets/styles/truckProfile.scss");

export default React.createClass({
    getInitialState: function() {
        return {
            companyName: "",
            cuisine: "",
            email: "",
            phone: "",
            url: "",
            facebook: "",
            twitter: "",
            instagram: "",
            logo: "",
            description: "",
            menu1: "",
            menu2: "",
            menu3: "",
            menu4: "",
            menu5: "",
            menu6: "",
            menu7: "",
            menu8: "",
            menu9: "",
            menu10: "",
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
        };
    },

    componentWillMount: function() {
        getCurrentTruckProfile().then(this.updateStateWithProfile);
    },

    updateStateWithProfile: function(profile) {
        if (!profile) {
            return;
        }

        this.setState({
            id: profile.id || "",
            companyName: profile.truck_name || "",
            cuisine: profile.cuisine || "",
            email: profile.email_address || "",
            phone: profile.phone_number || "",
            url: profile.website || "",
            facebook: profile.facebook_page || "",
            twitter: profile.twitter_page || "",
            instagram: profile.instagram_page || "",
            logo: profile.logo_url || "",
            description: profile.truck_description || "",
            menu1: profile.menu_item_1 || "",
            menu2: profile.menu_item_2 || "",
            menu3: profile.menu_item_3 || "",
            menu4: profile.menu_item_4 || "",
            menu5: profile.menu_item_5 || "",
            menu6: profile.menu_item_6 || "",
            menu7: profile.menu_item_7 || "",
            menu8: profile.menu_item_8 || "",
            menu9: profile.menu_item_9 || "",
            menu10: profile.menu_item_10 || "",
            menuPrice1: profile.item_1_price || "",
            menuPrice2: profile.item_2_price || "",
            menuPrice3: profile.item_3_price || "",
            menuPrice4: profile.item_4_price || "",
            menuPrice5: profile.item_5_price || "",
            menuPrice6: profile.item_6_price || "",
            menuPrice7: profile.item_7_price || "",
            menuPrice8: profile.item_8_price || "",
            menuPrice9: profile.item_9_price || "",
            menuPrice10: profile.item_10_price || "",
            menuImage1: profile.item_1_image || "",
            menuImage2: profile.item_2_image || "",
            menuImage3: profile.item_3_image || "",
            menuImage4: profile.item_4_image || "",
            menuImage5: profile.item_5_image || "",
            menuImage6: profile.item_6_image || "",
            menuImage7: profile.item_7_image || "",
            menuImage8: profile.item_8_image || "",
            menuImage9: profile.item_9_image || "",
            menuImage10: profile.item_10_image || ""
        });
    },

    handleChange: function() {
        this.setState({
            companyName: this.refs.companyName.value,
            cuisine: this.refs.cuisine.value,
            email: this.refs.email.value,
            phone: this.refs.phone.input.value,
            url: this.refs.url.value,
            facebook: this.refs.facebook.value,
            twitter: this.refs.twitter.value,
            innstagram: this.refs.instagram.value,
            logo: this.refs.logo.value,
            description: this.refs.description.value,
            menu1: this.refs.menu1.value,
            menu2: this.refs.menu2.value,
            menu3: this.refs.menu3.value,
            menu4: this.refs.menu4.value,
            menu5: this.refs.menu5.value,
            menu6: this.refs.menu6.value,
            menu7: this.refs.menu7.value,
            menu8: this.refs.menu8.value,
            menu9: this.refs.menu9.value,
            menu10: this.refs.menu10.value,
            menuPrice1: this.refs.menuPrice1.value,
            menuPrice2: this.refs.menuPrice2.value,
            menuPrice3: this.refs.menuPrice3.value,
            menuPrice4: this.refs.menuPrice4.value,
            menuPrice5: this.refs.menuPrice5.value,
            menuPrice6: this.refs.menuPrice6.value,
            menuPrice7: this.refs.menuPrice7.value,
            menuPrice8: this.refs.menuPrice8.value,
            menuPrice9: this.refs.menuPrice9.value,
            menuPrice10: this.refs.menuPrice10.value,
            menuImage1: this.refs.menuImage1.value,
            menuImage2: this.refs.menuImage2.value,
            menuImage3: this.refs.menuImage3.value,
            menuImage4: this.refs.menuImage4.value,
            menuImage5: this.refs.menuImage5.value,
            menuImage6: this.refs.menuImage6.value,
            menuImage7: this.refs.menuImage7.value,
            menuImage8: this.refs.menuImage8.value,
            menuImage9: this.refs.menuImage9.value,
            menuImage10: this.refs.menuImage10.value
        });
    },

    onSubmit: function() {
        if (!this.state.companyName) {
            return notify.show("Please enter your Company name!", "error");
        }

        if (!this.state.cuisine) {
            return notify.show("Please enter a type of Cuisine!", "error");
        }

        if (!emailRegEx.test(this.state.email)) {
            return notify.show("Please enter a valid email address.", "error");
        }

        if (!this.state.phone || this.state.phone.indexOf("_") >= 0) {
            return notify.show("Please enter a full 10-digit phone number", "error");
        }

        if (!urlRegEx.test(this.state.url)) {
            return notify.show("Please enter a valid url address.", "error");
        }

        if (!urlRegEx.test(this.state.logo)) {
            return notify.show("Please enter a valid logo url address.", "error");
        }

        if (!this.state.description) {
            return notify.show("Please enter your Company's description!", "error");
        }

        const payload = {
            truck_name: this.state.companyName,
            cuisine: this.state.cuisine,
            email_address: this.state.email,
            phone_number: this.state.phone.replace(/\D/g, ""),
            website: this.state.url,
            facebook_page: this.state.facebook,
            twitter_page: this.state.twitter,
            instagram_page: this.state.instagram,
            logo_url: this.state.logo,
            truck_description: this.state.description,
            menu_item_1: this.state.menu1,
            menu_item_2: this.state.menu2,
            menu_item_3: this.state.menu3,
            menu_item_4: this.state.menu4,
            menu_item_5: this.state.menu5,
            menu_item_6: this.state.menu6,
            menu_item_7: this.state.menu7,
            menu_item_8: this.state.menu8,
            menu_item_9: this.state.menu9,
            menu_item_10: this.state.menu10,
            item_1_price: this.state.menuPrice1,
            item_2_price: this.state.menuPrice2,
            item_3_price: this.state.menuPrice3,
            item_4_price: this.state.menuPrice4,
            item_5_price: this.state.menuPrice5,
            item_6_price: this.state.menuPrice6,
            item_7_price: this.state.menuPrice7,
            item_8_price: this.state.menuPrice8,
            item_9_price: this.state.menuPrice9,
            item_10_price: this.state.menuPrice10,
            item_1_image: this.state.menuImage1,
            item_2_image: this.state.menuImage2,
            item_3_image: this.state.menuImage3,
            item_4_image: this.state.menuImage4,
            item_5_image: this.state.menuImage5,
            item_6_image: this.state.menuImage6,
            item_7_image: this.state.menuImage7,
            item_8_image: this.state.menuImage8,
            item_9_image: this.state.menuImage9,
            item_10_image: this.state.menuImage10
        };
        saveTruckProfile(this.state.id, payload)
            .then(function() {
                notify.show("Your profile has been Saved!", "success");
            })
            .catch(function(err) {
                notify.show("Did not save!", "error");
            });
    },

    render: function() {
        return (
            <div className="truckProfile">
              <form className="truckForm">
                <div className="truckLabels">
                  <div>
                    <label className="companyLabels">Company Name: </label>
                  </div>
                  <div>
                    <label className="cuisineLabels">Cuisine: </label>
                  </div>
                  <div>
                    <label className="emailLabels">Email: </label>
                  </div>
                  <div>
                    <label className="phoneLabels">Phone: </label>
                  </div>
                  <div>
                    <label className="webAddressLabels">Web Address: </label>
                  </div>
                  <div>
                    <label className="facebookLabels">Facebook: </label>
                  </div>
                  <div>
                    <label className="twitterLabels">Twitter: </label>
                  </div>
                  <div>
                    <label className="instagramLabels">Instagram: </label>
                  </div>
                  <div>
                    <label className="logoLabels">Logo: </label>
                  </div>
                  <div>
                    <label className="descriptionLabels">Description: </label>
                  </div>
                </div>
                <div className="truckInformationContainer">
                  <div className="profileTruckInput">
                    <input ref="companyName" placeholder="Company Name" className="truckInput" type="text" name="companyName" value={ this.state.companyName } onChange={ this.handleChange }
                    />
                  </div>
                  <div className="profileTruckInput">
                    <input ref="cuisine" placeholder="Cuisine" className="truckInput" type="text" name="cuisine" value={ this.state.cuisine } onChange={ this.handleChange } />
                  </div>
                  <div className="profileTruckInput">
                    <input ref="email" placeholder="Email" className="truckInput" type="email" name="email" value={ this.state.email } onChange={ this.handleChange } />
                  </div>
                  <div className="profileTruckInput">
                    <MaskedInput mask="(111) 111-1111" ref="phone" placeholder="Phone" className="truckInput" type="tel" name="phone" value={ this.state.phone } onChange={ this.handleChange }
                    />
                  </div>
                  <div className="profileTruckInput">
                    <input ref="url" placeholder="Web Address" className="truckInput" type="url" name="url" value={ this.state.url } onChange={ this.handleChange } />
                  </div>
                  <div className="profileTruckInput">
                    <input ref="facebook" placeholder="Facebook" className="truckInput" type="url" name="facebook" value={ this.state.facebook } onChange={ this.handleChange } />
                  </div>
                  <div className="profileTruckInput">
                    <input ref="twitter" placeholder="Twitter" className="truckInput" type="url" name="twitter" value={ this.state.twitter } onChange={ this.handleChange } />
                  </div>
                  <div className="profileTruckInput">
                    <input ref="instagram" placeholder="Instagram" className="truckInput" type="url" name="instagram" value={ this.state.instagram } onChange={ this.handleChange } />
                  </div>
                  <div className="profileTruckInput">
                    <input ref="logo" placeholder="Logo" className="truckInput" type="text" name="logo" value={ this.state.logo } onChange={ this.handleChange } />
                  </div>
                  <div className="profileTruckInput">
                    <input ref="description" placeholder="Description" className="truckInput" value={ this.state.description } onChange={ this.handleChange }></input>
                  </div>
                </div>
                <label className="menuItemTitle">Menu Items:</label>
                <div className="menuContainer">
                  <div className="menuInput">
                    <input ref="menu1" placeholder="Menu Item" className="profileText" value={ this.state.menu1 } onChange={ this.handleChange } />
                    <input ref="menuPrice1" placeholder="Price" className="menuPrice" value={ this.state.menuPrice1 } onChange={ this.handleChange } />
                    <input ref="menuImage1" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage1 } onChange={ this.handleChange } />
                  </div>
                  <div className="menuInput">
                    <input ref="menu2" placeholder="Menu Item" className="profileText" value={ this.state.menu2 } onChange={ this.handleChange } />
                    <input ref="menuPrice2" placeholder="Price" className="menuPrice" value={ this.state.menuPrice2 } onChange={ this.handleChange } />
                    <input ref="menuImage2" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage2 } onChange={ this.handleChange } />
                  </div>
                  <div className="menuInput">
                    <input ref="menu3" placeholder="Menu Item" className="profileText" value={ this.state.menu3 } onChange={ this.handleChange } />
                    <input ref="menuPrice3" placeholder="Price" className="menuPrice" value={ this.state.menuPrice3 } onChange={ this.handleChange } />
                    <input ref="menuImage3" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage3 } onChange={ this.handleChange } />
                  </div>
                  <div className="menuInput">
                    <input ref="menu4" placeholder="Menu Item" className="profileText" value={ this.state.menu4 } onChange={ this.handleChange } />
                    <input ref="menuPrice4" placeholder="Price" className="menuPrice" value={ this.state.menuPrice4 } onChange={ this.handleChange } />
                    <input ref="menuImage4" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage4 } onChange={ this.handleChange } />
                  </div>
                  <div className="menuInput">
                    <input ref="menu5" placeholder="Menu Item" className="profileText" value={ this.state.menu5 } onChange={ this.handleChange } />
                    <input ref="menuPrice5" placeholder="Price" className="menuPrice" value={ this.state.menuPrice5 } onChange={ this.handleChange } />
                    <input ref="menuImage5" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage5 } onChange={ this.handleChange } />
                  </div>
                  <div className="menuInput">
                    <input ref="menu6" placeholder="Menu Item" className="profileText" value={ this.state.menu6 } onChange={ this.handleChange } />
                    <input ref="menuPrice6" placeholder="Price" className="menuPrice" value={ this.state.menuPrice6 } onChange={ this.handleChange } />
                    <input ref="menuImage6" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage6 } onChange={ this.handleChange } />
                  </div>
                  <div className="menuInput">
                    <input ref="menu7" placeholder="Menu Item" className="profileText" value={ this.state.menu7 } onChange={ this.handleChange } />
                    <input ref="menuPrice7" placeholder="Price" className="menuPrice" value={ this.state.menuPrice7 } onChange={ this.handleChange } />
                    <input ref="menuImage7" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage7 } onChange={ this.handleChange } />
                  </div>
                  <div className="menuInput">
                    <input ref="menu8" placeholder="Menu Item" className="profileText" value={ this.state.menu8 } onChange={ this.handleChange } />
                    <input ref="menuPrice8" placeholder="Price" className="menuPrice" value={ this.state.menuPrice8 } onChange={ this.handleChange } />
                    <input ref="menuImage8" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage8 } onChange={ this.handleChange } />
                  </div>
                  <div className="menuInput">
                    <input ref="menu9" placeholder="Menu Item" className="profileText" value={ this.state.menu9 } onChange={ this.handleChange } />
                    <input ref="menuPrice9" placeholder="Price" className="menuPrice" value={ this.state.menuPrice9 } onChange={ this.handleChange } />
                    <input ref="menuImage9" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage9 } onChange={ this.handleChange } />
                  </div>
                  <div className="menuInput">
                    <input ref="menu10" placeholder="Menu Item" className="profileText" value={ this.state.menu10 } onChange={ this.handleChange } />
                    <input ref="menuPrice10" placeholder="Price" className="menuPrice" value={ this.state.menuPrice10 } onChange={ this.handleChange } />
                    <input ref="menuImage10" placeholder="Enter image url" className="menuImage" value={ this.state.menuImage10 } onChange={ this.handleChange } />
                  </div>
                </div>
              </form>
              <div className="truckButtonContainer">
                <button className="profileButton" type="button" onClick={ this.onSubmit }>Submit</button>
              </div>
            </div>
        )
    }
})

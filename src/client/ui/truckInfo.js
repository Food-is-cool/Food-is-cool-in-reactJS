import React from 'react';

require('assets/styles/truckInfo.scss');
var img = require('assets/images/lena.png');

export default React.createClass({
  render: function() {
    return (
      <div className="truckInfoContainer">
        <div>
          <img className="infoLogo" src={ img } />
        </div>
        <div>
          <div className="infoStyle">
            <div className="companyName">Company Name</div>
            <br />
            <div className="info">Cuisine</div>
            <br />
            <div className="info">www.Email.com</div>
            <br />
            <div className="info">555-555-5555</div>
            <br />
            <div className="info">htpp://www.placeholder.com</div>
            <br />
            <div className="info">htpp://facebook/page.com</div>
            <br />
            <div>Bacon ipsum dolor amet pork shankle tenderloin pork chop, ribeye pork belly hamburger frankfurter ham picanha short ribs flank beef pancetta tongue. Shankle
              andouille sirloin, meatloaf strip steak ham filet mignon tail pork capicola sausage spare ribs bresaola picanha t-bone. Hamburger t-bone ham, short ribs
              sirloin ball tip bresaola kielbasa chicken. Meatloaf pancetta tri-tip capicola leberkas cow jowl cupim. Kielbasa ball tip shankle spare ribs, t-bone jowl
              tongue flank boudin.</div>
          </div>
        </div>
      </div>
    )
  }
})

import React from 'react';

require('assets/styles/truckProfile.scss');


export default React.createClass({


  render: function() {
    return (
      <div className="truckProfile">
        <form>
          <div className="profileInput">
            <span className="label">Company Name:</span>
            <br />
            <input className="input" type="text" name="companyName" />
            <br />
          </div>
          <div className="profileInput">
            <span className="label">Cuisine:</span>
            <br />
            <input className="input" type="text" name="Cuisine" />
            <br />
          </div>
          <div className="profileInput">
            <span className="label">Email:</span>
            <br />
            <input className="input" type="email" name="Email" />
            <br />
          </div>
          <div className="profileInput">
            <span className="label">Phone:</span>
            <br />
            <input className="input" type="tel" name="Phone" />
            <br />
          </div>
          <div className="profileInput">
            <span className="label">Web Address:</span>
            <br />
            <input className="input" type="url" name="url" />
            <br />
          </div>
          <div className="profileInput">
            <span className="label">facebook:</span>
            <br />
            <input className="input" type="url" name="facebook" />
            <br />
          </div>
          <div className="profileInput">
            <span className="label">Logo:</span>
            <br />
            <input className="input" type="text" name="Logo" />
            <br />
          </div>
          <div className="profileInput">
            <span className="label">Description:</span>
            <br />
            <textarea className="profileText" rows="4" cols="50"></textarea>
            <br />
          </div>
          <button className="profileButton" type="button">Submit</button>
        </form>
      </div>
    )
  }
})

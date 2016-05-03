import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";

// layouts
import App from "layouts/app";

// components
import Login from "ui/login";
import NotFound from "ui/notfound";
import TruckProfile from "ui/truckProfile";
import WhereWhen from "ui/whereWhen";
import Maps from "ui/map";
import TruckInfo from "ui/truckInfo";
import CustomerProfile from "ui/customerProfile";


export default (
<Router history={ browserHistory }>
  <Route component={ App }>
    <Route path="/" component={ Login } />
    <Route path="/truckProfile" component={ TruckProfile } />
    <Route path="/whereWhen" component={ WhereWhen } />
    <Route path="/map" component={ Maps } />
    <Route path="/truckInfo/:truckId" component={ TruckInfo } />
    <Route path="/customerProfile" component={ CustomerProfile } />
    <Route path="*" component={ NotFound } />
  </Route>
</Router>
)

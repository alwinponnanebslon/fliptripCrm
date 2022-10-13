
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Clients from './clients';
import ClientsList from './clientslist';
import Leades from './leades';
import Leads from '../Lead/Leads';
import LeadView from './LeadView';
import CreateQuote  from './CreateQuote';
import  QuotationFollowup  from './QuotationFollowup';
import  VoucherPayment  from './VoucherPayment';
import DuringStay from './DuringStay';
import PostStay from './PostStay';
import  RequestedTrips  from './RequestedTrips';
const EmployeeRoute = ({ match }) => (

   
   <>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/clients`} />
      <Route path={`${match.url}/clients`} component={Clients} />
      <Route path={`${match.url}/clients-list`} component={ClientsList} />
      {/* <Route path={`${match.url}/leads`} component={Leades} /> */}
      <Route path={`${match.url}/leads`} component={Leads} />
      <Route path={`${match.url}/lead-view/`} component={LeadView} />
      <Route path={`${match.url}/Create-Quote`} component={CreateQuote} />
      <Route path={`${match.url}/QuotationFollowup`} component={QuotationFollowup} />
      <Route path={`${match.url}/VoucherPayment`} component={VoucherPayment} />
      <Route path={`${match.url}/DuringStay`} component={DuringStay} />
      <Route path={`${match.url}/PostStay`} component={PostStay} />
      <Route path={`${match.url}/RequestedTrips`} component={RequestedTrips} />
   </>
);

export default EmployeeRoute;

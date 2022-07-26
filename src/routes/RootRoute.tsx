import React from 'react';
import {connect} from 'react-redux';
import HomeRoute from './HomeRoute';
import AuthRoute from './AuthRoute';

const RootRoute = ({loggedIn}: {loggedIn: boolean}) => {
  return !loggedIn ? <AuthRoute /> : <HomeRoute />;
};

export default connect(
  (state: any) => ({loggedIn: state.auth.loggedIn}),
  {},
)(RootRoute);

/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const GuardedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />);
      }}
    />
  );
};

GuardedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default GuardedRoute;

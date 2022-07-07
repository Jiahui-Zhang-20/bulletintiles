import {
  useNavigate, useParams, useLocation,
} from 'react-router-dom';
import React from 'react';

function withRouter(Component) {
  // eslint-disable-next-line func-names
  return (props) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} navigate={useNavigate()} params={useParams()} location={useLocation()} />;
  };
}

export default withRouter;

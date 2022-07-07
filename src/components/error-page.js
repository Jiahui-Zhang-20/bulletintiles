import React from 'react';
import errorImg from '../img/error.jpg';

const ErrorPage = (props) => {
  // const navigate = useNavigate();
  return (
    <div className="card-wrapper">
      <div className="card error-card" style={{ width: '18rem' }}>
        <img className="card-img-top" src={errorImg} alt="" />
        <div className="card-body">
          <div className="card-text">
            <h3>{props.errorMessage}</h3>
            <div>{props.errorExplanation}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

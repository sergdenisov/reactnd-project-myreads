import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';

const Error = props =>
  <div className="error">
    <div>
      <span>Sorry, something went wrong. Please </span>
      <a
        href=""
        onClick={event => {
          event.preventDefault();
          props.onClick();
        }}>
        try again
      </a>
      <span>.</span>
    </div>
  </div>;

Error.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Error;

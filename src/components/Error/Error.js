import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';

/** The component for handling an error. */
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
  /** The click handler. */
  onClick: PropTypes.func.isRequired,
};

export default Error;

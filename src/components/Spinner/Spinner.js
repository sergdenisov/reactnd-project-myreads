import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Spinner.css';

/** The component for the spinner. */
const Spinner = props =>
  <div className={classnames('spinner', { spinner_small: props.small })} />;

Spinner.propTypes = {
  /** The flag that indicates that the size of the spinner is small. */
  small: PropTypes.bool,
};

Spinner.defaultProps = {
  small: false,
};

export default Spinner;

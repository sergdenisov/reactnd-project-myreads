import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Spinner.css';

const Spinner = props =>
  <div className={classnames('spinner', { spinner_small: props.small })} />;

Spinner.propTypes = {
  small: PropTypes.bool,
};

Spinner.defaultProps = {
  small: false,
};

export default Spinner;

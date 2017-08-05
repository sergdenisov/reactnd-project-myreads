import React from 'react';
import './Spinner.css'

const Spinner = (props) => (
  <div className={`spinner ${props.small && 'spinner_small'}`}/>
);

Spinner.defaultProps = {
  small: false,
};

export default Spinner;

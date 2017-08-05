import React from 'react';
import './Spinner.css'
import classnames from 'classnames';

const Spinner = (props) => (
  <div className={classnames('spinner', {'spinner_small': props.small})}/>
);

Spinner.defaultProps = {
  small: false,
};

export default Spinner;

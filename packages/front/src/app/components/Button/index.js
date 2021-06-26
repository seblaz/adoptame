/* eslint-disable react/button-has-type */
import { bool, func, oneOf, string } from 'prop-types';
import React from 'react';

function Button({ label, onClick, type = 'button', className, disabled }) {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

Button.propTypes = {
  className: string,
  disabled: bool,
  label: string,
  type: oneOf(['button', 'submit', 'reset']),
  onClick: func
};

export default Button;

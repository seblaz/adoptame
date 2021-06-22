import React from 'react';
import { string, shape, func, arrayOf, bool } from 'prop-types';

import Placeholder from './components/Placeholder';
import styles from './styles.module.scss';

const Select = ({
  name,
  label,
  hideLabel,
  placeholder,
  options,
  handleChange,
  defaultValue,
  error,
  className,
  selectClassName,
  errorClassName,
  optionClassName,
  ...selectProps
}) => (
  <div className={className}>
    {!hideLabel && <span className={`${styles.inputLabel}`}>{label}</span>}
    <select
      onChange={handleChange}
      name={name}
      className={`${selectClassName} ${styles.select} `}
      defaultValue={defaultValue}
      {...selectProps}>
      <Placeholder label={placeholder} optionClassName={optionClassName} />
      {options.map(({ label: optionLabel, value, ...optionProps }) => (
        <option key={value} value={value} className={optionClassName} {...optionProps}>
          {optionLabel}
        </option>
      ))}
    </select>
    {error && <span className={errorClassName}>{error}</span>}
  </div>
);

Select.propTypes = {
  options: arrayOf(shape({ label: string, value: string })).isRequired,
  className: string,
  defaultValue: string,
  error: string,
  errorClassName: string,
  handleChange: func,
  hideLabel: bool,
  name: string,
  optionClassName: string,
  placeholder: string,
  selectClassName: string,
  label: string
};

Select.defaultProps = {
  className: '',
  error: '',
  errorClassName: '',
  name: '',
  optionClassName: '',
  placeholder: '',
  selectClassName: ''
};

export default Select;

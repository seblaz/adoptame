import { string } from 'prop-types';
import React from 'react';

function InfoItem({ label, value, className }) {
  return (
    <div className={className}>
      <span className="large-text bold">{label}</span>
      <span className="text"> {value}</span>
    </div>
  );
}

InfoItem.propTypes = {
  label: string.isRequired,
  value: string.isRequired,
  className: string
};

InfoItem.defaultProps = {
  className: 'row middle space-between'
};

export default InfoItem;

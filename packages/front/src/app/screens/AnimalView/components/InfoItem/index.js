import { string } from 'prop-types';
import React from 'react';

function InfoItem({ label, value }) {
  return (
    <div className="row middle space-between">
      <span className="large-text bold">{label}</span>
      <span className="text"> {value}</span>
    </div>
  );
}

InfoItem.propTypes = {
  label: string.isRequired,
  value: string.isRequired
};

export default InfoItem;

import { string } from 'prop-types';
import React from 'react';

import { capitalize } from '~utils/string';

function InfoItem({ label, value, className }) {
  return (
    <div className={className}>
      <span className="large-text bold">{label}</span>
      <span className="text">{Number.isInteger(value) ? value : capitalize(value || '')}</span>
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

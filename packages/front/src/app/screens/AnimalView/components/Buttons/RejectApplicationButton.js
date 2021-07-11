import React from 'react';

import Button from '~app/components/Button';

import styles from '../../styles.module.scss';

const RejectApplicationButton = ({ onClick }) => (
  <Button type="button" label="Rechazar" className={styles.button} onClick={onClick} />
);

export default RejectApplicationButton;

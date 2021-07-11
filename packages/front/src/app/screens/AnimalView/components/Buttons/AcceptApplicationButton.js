import React from 'react';

import Button from '~app/components/Button';

import styles from '../../styles.module.scss';

const AcceptApplicationButton = ({ onClick }) => (
  <Button type="button" label="Aceptar" className={styles.button} onClick={onClick} />
);

export default AcceptApplicationButton;

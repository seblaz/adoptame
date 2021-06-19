import React, { useState } from 'react';

import Input from '~app/components/Input';

import styles from './styles.module.scss';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={`column center middle ${styles.container}`}>
      <h1 className="title bold">Registro</h1>
      <Input
        name="email"
        label="Email"
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
    </div>
  );
};

export default Registration;

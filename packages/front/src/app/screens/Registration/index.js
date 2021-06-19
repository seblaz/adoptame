import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from '~app/components/Input';
import Button from '~app/components/Button';
import actionCreators from '~redux/Auth/actions';

import styles from './styles.module.scss';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(actionCreators.register({ email, password }));
  };

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
      <Button label="Enviar" onClick={handleSubmit} />
    </div>
  );
};

export default Registration;

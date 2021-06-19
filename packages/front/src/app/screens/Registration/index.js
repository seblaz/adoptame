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

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(actionCreators.register({ email, password }));
  };

  return (
    <div className={`column center middle ${styles.container}`}>
      <h1 className="title bold">Registro</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        <Button label="Enviar" type="submit" />
      </form>
    </div>
  );
};

export default Registration;

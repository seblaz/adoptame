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
      <form onSubmit={handleSubmit} className={`column middle ${styles.formContainer}`}>
        <h1 className="title bold m-bottom-4">Registro</h1>
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
        <Button type="submit" className={`row center middle ${styles.submit}`} label="Enviar" />
      </form>
    </div>
  );
};

export default Registration;

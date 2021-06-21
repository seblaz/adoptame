import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';

// // Replace for project logo and/or banner
// import LoginBanner from '~assets/adoptame-banner.jpg';
import { isValidEmail } from '~utils/validations';
import Input from '~app/components/Input';
import Button from '~app/components/Button';
import actionCreators from '~redux/Auth/actions';

import styles from './styles.module.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();

  const handleUserChange = event => {
    const { value } = event?.currentTarget;
    setEmailError(!isValidEmail(value) && i18next.t('Validations:invalidEmail'));
    setEmail(value);
  };

  const handlePassChange = event => setPassword(event?.currentTarget?.value);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(actionCreators.signIn({ email, password }));
  };

  return (
    <div className="row full-width space-between">
      <div className={`column full-width center middle ${styles.loginContainer}`}>
        <form className={`column ${styles.loginFormContainer}`} onSubmit={handleSubmit}>
          <h3 className={styles.loginWelcome}>{i18next.t('Login:welcome')}</h3>
          <Input
            name="email"
            label={i18next.t('Login:user')}
            className="m-bottom-4"
            type="email"
            inputType="text"
            onChange={handleUserChange}
            value={email}
            error={emailError}
          />
          <Input
            name="password"
            label={i18next.t('Login:password')}
            className="m-bottom-4"
            type="password"
            inputType="text"
            value={password}
            onChange={handlePassChange}
          />

          <Button type="submit" className={`${styles.loginButton}`} label={i18next.t('Login:login')} />
        </form>
        {/* <img src={LoginBanner} className={`full-width ${styles.loginBanner}`} /> */}
      </div>
    </div>
  );
}

export default Login;

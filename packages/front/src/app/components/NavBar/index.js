import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ROUTES } from '~constants/routes';
import actionCreators from '~redux/Auth/actions';
import AdoptameIcon from '~assets/adoptame.png';

import styles from './styles.module.scss';

const MENU_ITEMS = [
  {
    label: 'Crear publicación',
    path: ROUTES.CREATE_ANIMAL
  },
  {
    label: 'Ver publicaciones',
    path: ROUTES.ANIMALS
  },
  {
    label: 'Perfil',
    path: ROUTES.PERSONAL_DATA
  }
];

function NavBar() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(actionCreators.signOff());
  };
  return (
    <div className={`row middle full-width ${styles.navbarContainer}`}>
      <Link to={ROUTES.HOME}>
        <img className={styles.icon} src={AdoptameIcon} />
      </Link>
      <div className="row center middle full-width">
        {MENU_ITEMS.map(({ path, label }) => (
          <Link to={path} key={path} className={`bold m-right-6 m-left-6 ${styles.navbarItem}`}>
            <span variant="h6" className={styles.title}>
              {label}
            </span>
          </Link>
        ))}
      </div>
      <Link to={ROUTES.LOGIN} onClick={logout}>
        <button type="button" color="inherit">
          Logout
        </button>
      </Link>
    </div>
  );
}

export default NavBar;

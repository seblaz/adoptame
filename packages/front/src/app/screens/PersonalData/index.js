import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import actionCreators from '~redux/User/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';
import { ROUTES } from '~constants/routes';

const PersonalDataEdit = () => {
  const { me, meLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.getMyData());
  }, [dispatch]);

  return (
    <LoadingWrapper loading={meLoading}>
      {me && (
        <div className="column center middle">
          <h1 className="title bold">Datos personales</h1>
          <div>Nombre: {me.nombre}</div>
          <div>Teléfono: {me.telefono}</div>
          <div>Email: {me.email}</div>
          <div>Año de nacimiento: {me.anioDeNacimiento}</div>
          <div>Zona: {me.zona}</div>
          <div>
            <Link to={ROUTES.PERSONAL_DATA_EDIT}>Editar</Link>
          </div>
        </div>
      )}
    </LoadingWrapper>
  );
};

export default PersonalDataEdit;

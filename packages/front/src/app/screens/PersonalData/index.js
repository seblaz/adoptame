import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import actionCreators from '~redux/MyData/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';
import { ROUTES } from '~constants/routes';

const PersonalDataEdit = () => {
  const { me, meLoading } = useSelector(state => state.me);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.getMyData());
  }, [dispatch]);

  return (
    <LoadingWrapper loading={meLoading}>
      {me && (
        <div className="column center middle">
          <h1 className="title bold">Datos personales</h1>
          <div>Nombre: {me.user.nombre}</div>
          <div>Teléfono: {me.user.telefono}</div>
          <div>Email: {me.user.email}</div>
          <div>Año de nacimiento: {me.user.anio_de_nacimiento}</div>
          <div>Zona: {me.user.zona}</div>
          <div>
            <Link to={ROUTES.PERSONAL_DATA_EDIT}>Editar</Link>
          </div>
        </div>
      )}
    </LoadingWrapper>
  );
};

export default PersonalDataEdit;

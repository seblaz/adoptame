import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actionCreators from '~redux/MyData/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';

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
          <div>Nombre: {me.nombre}</div>
          <div>Especie: {me.telefono}</div>
          <div>Sexo: {me.email}</div>
          <div>Edad: {me.anio_nacimiento}</div>
          <div>Tamaño: {me.zona}</div>
        </div>
      )}
    </LoadingWrapper>
  );
};

export default PersonalDataEdit;

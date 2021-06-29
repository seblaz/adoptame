/* eslint-disable camelcase */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import actionCreators from '~redux/User/actions';
import LoadingWrapper from '~app/components/LoadingWrapper';
import Input from '~components/Input';
import Button from '~components/Button';

import styles from './styles.module.scss';

const PersonalDataEdit = () => {
  const { me, meLoading } = useSelector(state => state.user);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [anioDeNacimiento, setAnioDeNacimiento] = useState('');
  const [zona, setZona] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.getMyData());
  }, [dispatch]);

  useEffect(() => {
    if (me) {
      setNombre(me.nombre || '');
      setEmail(me.email || '');
      setTelefono(me.telefono || '');
      setAnioDeNacimiento(me.anioDeNacimiento || '');
      setZona(me.zona || '');
    }
  }, [me]);

  const handleSubmit = event => {
    event.preventDefault();

    dispatch(
      actionCreators.updateMyData({
        nombre,
        email,
        telefono,
        anioDeNacimiento,
        zona
      })
    );
  };

  return (
    <LoadingWrapper loading={meLoading}>
      {me && (
        <form onSubmit={handleSubmit} className={`column middle ${styles.formContainer}`}>
          <h1 className="title bold">Editar datos personales</h1>
          <Input
            name="nombre"
            label="Nombre"
            value={nombre}
            type="text"
            onChange={event => setNombre(event.target.value)}
            required
          />
          <Input
            name="email"
            label="Email"
            value={email}
            type="text"
            onChange={event => setEmail(event.target.value)}
            required
          />
          <Input
            name="telefono"
            label="Teléfono"
            value={telefono}
            type="tel"
            onChange={event => setTelefono(event.target.value)}
            required
          />
          <Input
            name="anio_de_nacimiento"
            label="Año de nacimiento"
            value={anioDeNacimiento}
            type="number"
            min={0}
            max={150}
            onChange={event => setAnioDeNacimiento(event.target.value)}
          />
          <Input
            name="zona"
            label="Zona"
            value={zona}
            type="text"
            onChange={event => setZona(event.target.value)}
            required
          />
          <Button type="submit" className={`row center middle ${styles.submit}`} label="Enviar" />
        </form>
      )}
    </LoadingWrapper>
  );
};

export default PersonalDataEdit;

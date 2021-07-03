import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import actionCreators from '~redux/Animal/actions';
import Input from '~app/components/Input';
import Button from '~app/components/Button';
import Select from '~components/Select';
import { ESPECIES, SEXOS, TAMANIOS } from '~components/Animals/constants';

import styles from './styles.module.scss';

const CreateAnimal = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [especie, setEspecie] = useState();
  const [tamanio, setTamanio] = useState();
  const [sexo, setSexo] = useState();
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(actionCreators.createAnimal({ nombre, edad, especie, tamanio, sexo }));
  };

  return (
    <div className={`column center middle ${styles.container}`}>
      <form onSubmit={handleSubmit} className={`column middle ${styles.formContainer}`}>
        <h1 className="title bold">Crear publicación</h1>
        <Input
          name="nombre"
          label="Nombre"
          value={nombre}
          type="text"
          onChange={event => setNombre(event.target.value)}
          required
        />
        <Select
          name="especie"
          placeholder="-- Seleccione una especie --"
          label="Especie:"
          options={ESPECIES}
          value={especie}
          onChange={event => setEspecie(event.target.value)}
        />
        <Select
          name="tamanio"
          placeholder="-- Seleccione un tamaño --"
          label="Tamaño:"
          className={styles.selectAnimalCreate}
          options={TAMANIOS}
          value={tamanio}
          onChange={event => setTamanio(event.target.value)}
        />
        <Select
          name="sexo"
          placeholder="-- Seleccione el sexo --"
          label="Sexo:"
          options={SEXOS}
          value={sexo}
          onChange={event => setSexo(event.target.value)}
        />
        <Input
          name="edad"
          label="Edad"
          type="number"
          value={edad}
          onChange={event => setEdad(event.target.value)}
          min={0}
          max={25}
          step={1}
          required
        />
        <Button type="submit" className={`row center middle ${styles.submit}`} label="Enviar" />
      </form>
    </div>
  );
};

export default CreateAnimal;

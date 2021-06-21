import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import actionCreators from '~redux/Animal/actions';
import Input from '~app/components/Input';
import Button from '~app/components/Button';
import Select from '~components/Select';

const Animal = () => {
  const especies = [
    {
      label: 'Perro',
      value: 'perro'
    },
    {
      label: 'Gato',
      value: 'gato'
    }
  ];

  const tamanios = [
    {
      label: 'Chico',
      value: 'chico'
    },
    {
      label: 'Mediano',
      value: 'mediano'
    },
    {
      label: 'Grande',
      value: 'grande'
    }
  ];

  const sexos = [
    {
      label: 'Femenino',
      value: 'femenino'
    },
    {
      label: 'Masculino',
      value: 'masculino'
    }
  ];

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [especie, setEspecie] = useState(especies[0].value);
  const [tamanio, setTamanio] = useState(tamanios[1].value);
  const [sexo, setSexo] = useState(sexos[0].value);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(actionCreators.createAnimal({ nombre, edad, especie, tamanio, sexo }));
  };

  return (
    <div className="column center middle">
      <h1 className="title bold">Crear publicación</h1>
      <form onSubmit={handleSubmit}>
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
          label="Especie"
          options={especies}
          value={especie}
          onChange={event => setEspecie(event.target.value)}
        />
        <Select
          name="tamanio"
          label="Tamaño"
          options={tamanios}
          value={tamanio}
          onChange={event => setTamanio(event.target.value)}
        />
        <Select
          name="sexo"
          label="Sexo"
          options={sexos}
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
        <Button label="Enviar" type="submit" />
      </form>
    </div>
  );
};

export default Animal;

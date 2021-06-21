import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const AnimalView = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState();
  useEffect(() => {
    fetch(`http://localhost:8080/animals/${id}`)
      .then(res => res.json())
      .then(animalV => setAnimal(animalV));
  });

  return animal ? (
    <div className="column center middle">
      <h1 className="title bold">Animal</h1>
      <div>Nombre: {animal.nombre}</div>
      <div>Especie: {animal.especie}</div>
      <div>Sexo: {animal.sexo}</div>
      <div>Edad: {animal.edad}</div>
      <div>Tamaño: {animal.tamanio}</div>
    </div>
  ) : (
    <div />
  );
};

export default AnimalView;

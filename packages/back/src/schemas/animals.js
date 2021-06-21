const errors = require('./errors');

module.exports = {
  nombre: {
    in: ['body'],
    isString: true,
    errorMessage: errors.ANIMAL.NOMBRE,
  },
  especie: {
    in: ['body'],
    isIn: {
      options: [["perro", "gato"]],
      errorMessage: errors.ANIMAL.ESPECIE
    },
    errorMessage: errors.ANIMAL.ESPECIE,
  },
  tamanio: {
    in: ['body'],
    isIn: {
      options: [["chico", "mediano", "grande"]],
      errorMessage: errors.ANIMAL.TAMANIO
    },
    errorMessage: errors.ANIMAL.TAMANIO,
  },
  sexo: {
    in: ['body'],
    isIn: {
      options: [["femenino", "masculino"]],
      errorMessage: errors.ANIMAL.SEXO
    },
    errorMessage: errors.ANIMAL.SEXO,
  },
  edad: {
    in: ['body'],
    isInt: { options: {min: 0, max: 25} },
    errorMessage: errors.ANIMAL.EDAD,
  },
};

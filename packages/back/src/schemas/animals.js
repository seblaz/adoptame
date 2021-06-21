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
};

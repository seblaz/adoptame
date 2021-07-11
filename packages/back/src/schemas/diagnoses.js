const errors = require('./errors');

module.exports = {
  animalId: {
    in: ['body'],
    isString: true,
    errorMessage: errors.DIAGNOSES.USER_ID,
  },
  userId: {
    in: ['body'],
    isString: true,
    errorMessage: errors.DIAGNOSES.ANIMAL_ID,
  },
  data: {
    in: ['body'],
    isString: true,
    errorMessage: errors.DIAGNOSES.DATA,
  },
};

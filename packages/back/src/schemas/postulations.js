const errors = require('./errors');

module.exports = {
  animalId: {
    in: ['body'],
    isString: true,
    errorMessage: errors.POSTULATION.ANIMALID,
  },
  description: {
    in: ['body'],
    isString: true,
    errorMessage: errors.POSTULATION.DESCRIPTION,
  },
};

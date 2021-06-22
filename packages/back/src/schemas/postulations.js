const errors = require('./errors');

module.exports = {
  userId: {
    in: ['body'],
    isString: true,
    errorMessage: errors.POSTULATION.USER_ID,
  },
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

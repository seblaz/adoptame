const Postulation = require('../models/postulations');
const { endRequest, catchRequest } = require('../helpers/request');

const createPostulation = async (req, res) => {
  const postulation = new Postulation({ ...req.body, userId: req.user.id });
  return postulation.save()
    .then((response) => endRequest({
      response,
      code: 201,
      res,
    }))
    .catch((err) => {
      let code = 500;
      let message = 'An error occurs creating postulation';

      switch (err.name) {
        case 'MongoError': {
          // when an element was already inserted in DB
          code = err.code === 11000 ? 409 : 500;
          message = `Postulation with userId: ${postulation.userId} and animalId: ${postulation.animalId}, already created`;
          break;
        }
        case 'ValidationError': {
          code = 400;
          message = 'An error occurs validating postulation';
          break;
        }
        default:
          break;
      }

      catchRequest({
        err: { ...err, message }, res, message, code,
      });
    });
};

module.exports = {
  createPostulation,
};

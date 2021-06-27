const Postulation = require('../models/postulations');
const User = require('../models/users');
const { endRequest, catchRequest } = require('../helpers/request');
const { entityNotFound } = require('../errors');

const createPostulation = async (req, res) => {
  // TODO: REMOVE "60d7bc778a375adcc9f84126" WHEN ITS WORKING
  const postulation = new Postulation({ ...req.body, userId: req.user._id});
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

const getPostulationByAnimalId = async (req, res) => {
  
  const { params: { animalId } } = req;

  let postulations = await Postulation.find({ animalId });

  if (!postulations || postulations.length === 0) return catchRequest(
    { err: entityNotFound(`animalId ${animalId}`, 'postulation', '1032'), res });

  const userIds = postulations.map(({ userId }) => userId );

  const users = await User.find({ _id: userIds });

  const usersMappedById = users.reduce((aux, user) => { 
    aux[user._id] = user;
    return aux
  }, {});

  console.log(usersMappedById);

  postulations = postulations.map(postulation => ({ 
    ...postulation._doc, 
    user: usersMappedById[postulation.userId]
  }));

  return endRequest({
    response: postulations, 
    code: 200, 
    res
  });
}

module.exports = {
  createPostulation,
  getPostulationByAnimalId
};


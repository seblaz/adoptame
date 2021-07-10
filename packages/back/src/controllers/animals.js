const Animal = require('../models/animals');
const { endRequest, catchRequest } = require('../helpers/request');
const { entityNotFound } = require('../errors');

const createAnimal = async (req, res) => {
  const animal = new Animal({ ...req.body, userId: req.user.id });
  return animal.save()
    .then((response) => endRequest({
      response,
      code: 201,
      res,
    }))
    .catch((err) => {
      const code = err.name === 'ValidationError' ? 400 : undefined;
      catchRequest({
        err, res, message: 'Ha ocurrido un error creando el animal', code,
      });
    });
};

const getAnimalById = async (req, res) => {
  const { id } = req.params;
  const animal = await Animal.findById(id);

  if (!animal) return catchRequest({ err: entityNotFound(`id ${id}`, 'animal', '1032'), res });
  return endRequest({
    response: animal,
    code: 200,
    res,
  });
};

const getAnimals = async (_, res) => Animal.find({ adopted: false })
  .then((response) => {
    endRequest({ response, code: 200, res });
  })
  .catch((err) => {
    catchRequest(err, res, 'An error occurs when getting animals from DB', err);
  });

const getMyPostedAnimals = async (req, res) => Animal.find().byUserId(req.user.id)
  .then((response) => endRequest({
    response,
    code: 200,
    res,
  }))
  .catch((err) => {
    catchRequest(err, res, 'An error occurs when getting animals from DB', err);
  });

const getMyAdoptedAnimals = async (req, res) => Animal.find({ adopter: req.user.id })
  .then((response) => endRequest({
    response,
    code: 200,
    res,
  }))
  .catch((err) => {
    catchRequest(err, res, 'An error occurs when getting animals from DB', err);
  });

module.exports = {
  createAnimal,
  getAnimalById,
  getAnimals,
  getMyPostedAnimals,
  getMyAdoptedAnimals,
};

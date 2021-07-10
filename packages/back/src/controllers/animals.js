const Animal = require('../models/animals');
const { endRequest, catchRequest } = require('../helpers/request');
const { entityNotFound } = require('../errors');

const createAnimal = async (req, res) => {
  if(!req.file){
    res.status(400).send(`No file sent, body sent: ${JSON.stringify(req.body)}`)
  }
  const animal = new Animal({ ...req.body, userId: req.user.id , imagePath: req.file.path.replace('public','')})
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

const getAnimals = async (req, res) => {
  const { onlyNotAdopted } = req.query;
  if (onlyNotAdopted) {
    return Animal.find({ adopted: false })
    .then((response) => {
      endRequest({ response, code: 200, res });
    }).catch((err) => {
      catchRequest(err, res, 'An error occurs when getting animals from DB', err);
    });
  }

  return Animal.find()
  .then((response) => {
    endRequest({ response, code: 200, res });
  })
  .catch((err) => {
    catchRequest(err, res, 'An error occurs when getting animals from DB', err);
  });
};

const getMyPostedAnimals = async (req, res) => Animal.find().byUserId(req.user.id)
  .then((response) => endRequest({
    response,
    code: 200,
    res,
  }))
  .catch((err) => {
    catchRequest(err, res, 'An error occurs when getting animals from DB', err);
  });

const uploadAnimalPhoto = async (req, res) => endRequest({ response: res, res, code: 200 });

module.exports = {
  createAnimal,
  getAnimalById,
  getAnimals,
  getMyPostedAnimals,
  uploadAnimalPhoto,
};

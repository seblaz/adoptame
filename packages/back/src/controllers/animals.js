const Animal = require('../models/animals');
const { endRequest, catchRequest } = require('../helpers/request');

const createAnimal = async (req, res) => {
  console.log(req.body);
  const animal = new Animal(req.body);
  return animal.save()
    .then((response) => endRequest({
      response: response,
      code: 201,
      res,
    }))
    .catch((err) => {
      const code = err.name === 'ValidationError' ? 400 : undefined
      catchRequest({
        err, res, message: 'Ha ocurrido un error creando el animal', code
      })
    });
};


module.exports = {
  createAnimal
};

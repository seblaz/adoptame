const Diagnoses = require('../models/diagnosis');
const { endRequest, catchRequest } = require('../helpers/request');

const getDiagnoses = async (req, res) => {
  const { animalId } = req.query;
  const diagnoses = await Diagnoses.find({ animalId });

  if (!diagnoses) return catchRequest({ err: entityNotFound(`id ${id}`, 'diagnoses', '1032'), res });
  return endRequest({
    response: diagnoses,
    code: 200,
    res,
  });
};

const createDiagnoses = async (req, res) => {
  const diagnoses = new Diagnoses({ ...req.body, userId: req.user.id });
  return diagnoses.save()
    .then((response) => endRequest({
      response,
      code: 201,
      res,
    }))
    .catch((err) => {
      const code = err.name === 'ValidationError' ? 400 : undefined;
      catchRequest({
        err, res, message: 'Ha ocurrido un error creando el diagnostico', code,
      });
    });
};

module.exports = {
  createDiagnoses,
  getDiagnoses
};

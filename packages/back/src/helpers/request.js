const { inspect } = require('util');
const logger = require('../logger');

const endRequest = ({ response = undefined, code, res }) => (response
  ? res.status(code).send(response)
  : res.status(code).end());

const catchRequest = ({
  err, res, message = 'Server Error', internalCode = '9999', code,
}) => {
  logger.error(inspect(err, { showHidden: false, depth: null }));
  return res.status((code || (err && err.code)) || 503).json([{
    internal_code: (err && err.internalCode) || internalCode,
    message: (err && err.message) || message,
  }]);
};

module.exports = { endRequest, catchRequest };

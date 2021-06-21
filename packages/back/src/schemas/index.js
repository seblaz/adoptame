const usersSchema = require('./users');
const signInSchema = require('./sign_in');
const emailSchema = require('./email');
const passwordSchema = require('./password');
const animalSchema = require('./animals');

module.exports = {
  usersSchema,
  signInSchema,
  passwordSchema,
  emailSchema,
  animalSchema
};

const health = require('./controllers/health_check');
const {
  createUser, signIn, getUser, changePasswordFlow,
  updatePassword, getUsers, updateUser, deleteUser, getUserById,
} = require('./controllers/users');

const {
  createAnimal,
  getAnimalById, 
  getAnimals
} = require('./controllers/animals');

const { validateSchemaAndFail } = require('./middlewares/params');
const mongoQueries = require('./middlewares/mongo_queries');

const { authenticateUser: authenticate, authenticatePasswordChange, isAdmin } = require('./middlewares/auth');

const {
  usersSchema, signInSchema,
  passwordSchema, emailSchema, 
  animalSchema,
} = require('./schemas');
const { createSignedUrl } = require('./controllers/files');

module.exports = (app) => {
  // web app
  app.get('/health', health);
  app.post('/users', [validateSchemaAndFail(usersSchema)], createUser);
  app.post('/files/signed_url', [], createSignedUrl);
  app.post('/users/forgot_password', [validateSchemaAndFail(emailSchema)], changePasswordFlow);
  app.post('/users/password', [validateSchemaAndFail(passwordSchema), authenticatePasswordChange], updatePassword);
  app.post('/sign_in', [validateSchemaAndFail(signInSchema)], signIn);
  app.get('/users/:id', [authenticate, isAdmin, mongoQueries], getUserById);
  app.put('/users/:id', [authenticate, isAdmin, mongoQueries], updateUser);
  app.delete('/users/:id', [authenticate, isAdmin, mongoQueries], deleteUser);
  app.get('/users', [authenticate, isAdmin, mongoQueries], getUsers);
  // Animals
  // TODO: add authentication to this apis
  
  app.post('/animals', [validateSchemaAndFail(animalSchema)], createAnimal);
  app.get('/animals', getAnimals);
  app.get('/animals/:id', mongoQueries, getAnimalById);

  app.get('/me', [authenticate], getUser);
};

const health = require('./controllers/health_check');
const {
  createUser, signIn, getUser, changePasswordFlow, updateMe,
  updatePassword, getUsers, updateUser, deleteUser, getUserById,
} = require('./controllers/users');

const {
  createAnimal,
  getAnimalById, 
  getAnimals
} = require('./controllers/animals');

const {
  createPostulation,
} = require('./controllers/postulations');

const { validateSchemaAndFail } = require('./middlewares/params');
const mongoQueries = require('./middlewares/mongo_queries');

const { authenticateUser: authenticate, authenticatePasswordChange, isAdmin } = require('./middlewares/auth');

const {
  usersSchema, signInSchema,
  passwordSchema, emailSchema,
  animalSchema, postulationSchema,
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
  
  app.get('/animals', getAnimals);
  app.post('/animals', [authenticate, validateSchemaAndFail(animalSchema)], createAnimal);
  app.get('/animals/:id', [authenticate, mongoQueries], getAnimalById);
  // Postulations
  app.post('/postulations', [authenticate, validateSchemaAndFail(postulationSchema)], createPostulation);

  app.get('/me', [authenticate], getUser);
  app.put('/me', [authenticate, mongoQueries], updateMe);
};

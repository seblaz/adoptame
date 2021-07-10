const health = require('./controllers/health_check');
const {
  createUser, signIn, getUser, changePasswordFlow, updateMe,
  updatePassword, getUsers, updateUser, deleteUser, getUserById,
} = require('./controllers/users');

const {
  createAnimal,
  getAnimalById,
  getAnimals,
  getMyPostedAnimals,
  getMyAdoptedAnimals,
} = require('./controllers/animals');

const {
  createPostulation,
  getPostulationByAnimalId,
  acceptPostulation,
} = require('./controllers/postulations');

const {
  createDiagnoses,
} = require('./controllers/diagnoses');

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
  app.post('/files/signed_url', [], createSignedUrl);
  app.post('/sign_in', [validateSchemaAndFail(signInSchema)], signIn);

  // Users:
  app.post('/users', [validateSchemaAndFail(usersSchema)], createUser);
  app.get('/users/:id', [authenticate, mongoQueries], getUserById);
  app.put('/users/:id', [authenticate, isAdmin, mongoQueries], updateUser);
  app.delete('/users/:id', [authenticate, isAdmin, mongoQueries], deleteUser);
  app.get('/users', [authenticate, isAdmin, mongoQueries], getUsers);
  app.post('/users/forgot_password', [validateSchemaAndFail(emailSchema)], changePasswordFlow);
  app.post('/users/password', [validateSchemaAndFail(passwordSchema), authenticatePasswordChange], updatePassword);

  // Animals
  app.get('/animals', [authenticate], getAnimals);
  app.post('/animals', [authenticate, validateSchemaAndFail(animalSchema)], createAnimal);
  app.get('/animals/:id', [authenticate, mongoQueries], getAnimalById);

  // Postulations
  app.post('/postulations', [authenticate, validateSchemaAndFail(postulationSchema)], createPostulation);
  app.get('/postulations/:animalId', [authenticate], getPostulationByAnimalId);
  app.patch('/postulations/:id', [authenticate, mongoQueries], acceptPostulation);
  app.get('/postulations/:animalId', [authenticate], getPostulationByAnimalId);

  app.get('/me', [authenticate], getUser);
  app.put('/me', [authenticate, mongoQueries], updateMe);
  app.get('/me/animals', [authenticate], getMyPostedAnimals);
  app.get('/me/adoptedAnimals', [authenticate], getMyAdoptedAnimals);

  // diagnoses
  app.post('/diagnoses', [authenticate], createDiagnoses);
};

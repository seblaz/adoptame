const express = require('express');
const health = require('./controllers/health_check');

var multer  = require('multer');

var storage = multer.diskStorage(
  {
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, req.params.id + ".png")
    }
  }
);

var upload = multer({ storage: storage });

const {
  createUser, signIn, getUser, changePasswordFlow, updateMe,
  updatePassword, getUsers, updateUser, deleteUser, getUserById,
} = require('./controllers/users');

const {
  createAnimal,
  getAnimalById, 
  getAnimals,
  uploadAnimalPhoto
} = require('./controllers/animals');

const {
  createPostulation,
  getPostulationByAnimalId
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
  app.post('/animals/:id/photos', upload.single('photo'), uploadAnimalPhoto);
  app.use("/uploads", express.static(__dirname + '/uploads'));

  // Postulations
  app.post('/postulations', [authenticate, validateSchemaAndFail(postulationSchema)], createPostulation);
  app.get('/postulations/:animalId', [authenticate], getPostulationByAnimalId);
  app.get('/postulations/:animalId', [authenticate], getPostulationByAnimalId);
  
  app.get('/me', [authenticate], getUser);
  app.put('/me', [authenticate, mongoQueries], updateMe);
};

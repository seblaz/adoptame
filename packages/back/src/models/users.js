const { schema: Schema, mongoose } = require('../db');

const schema = new Schema({
  email: { type: String, match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  password: String,
  role: String,
  nombre: String,
  telefono: String,
  anio_de_nacimiento: String,
  zona: String,
}, { timestamps: true });

module.exports = mongoose.model('User', schema);

const { schema: Schema, mongoose } = require('../db');

const schema = new Schema({
  nombre: { type: String, required: true },
  especie: { type: String, enum: ['perro', 'gato'], required: true},
}, { timestamps: true });

module.exports = mongoose.model('Animal', schema);

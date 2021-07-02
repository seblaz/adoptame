const { schema: Schema, mongoose } = require('../db');

const schema = new Schema({
  nombre: { type: String, required: true },
  especie: { type: String, enum: ['perro', 'gato'], required: true },
  tamanio: { type: String, enum: ['chico', 'mediano', 'grande'] },
  edad: { type: Number },
  sexo: { type: String, enum: ['femenino', 'masculino'], required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  adopted: { type: Boolean, default: false}
}, { timestamps: true });

module.exports = mongoose.model('Animal', schema);

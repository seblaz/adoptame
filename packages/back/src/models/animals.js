const { schema: Schema, mongoose } = require('../db');

const schema = new Schema({
  nombre: { type: String, required: true },
  especie: { type: String, enum: ['perro', 'gato'], required: true },
  tamanio: { type: String, enum: ['chico', 'mediano', 'grande'], required: true },
  edad: { type: Number, required: true },
  sexo: { type: String, enum: ['femenino', 'masculino'], required: true },
  imagePath: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  adopted: { type: Boolean, default: false },
  notas: { type: String },
  adopter: { type: Schema.Types.ObjectId },
  notas: { type: String, required: true }
}, { timestamps: true });

schema.query.byUserId = function (id) {
  return this.where({ userId: id });
};

const Animal = mongoose.model('Animal', schema);

module.exports = Animal;

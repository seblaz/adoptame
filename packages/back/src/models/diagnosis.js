const { schema: Schema, mongoose } = require('../db');

const schema = new Schema({
  animalId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  data: { type: String, required: true },
}, { timestamps: true });

const Diagnosis = mongoose.model('Diagnosis', schema);

module.exports = Diagnosis;

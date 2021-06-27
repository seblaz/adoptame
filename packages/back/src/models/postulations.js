const { schema: Schema, mongoose } = require('../db');

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  animalId: { type: Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

// to set unique index
schema.index({ userId: 1, animalId: 1 }, { unique: true });

module.exports = mongoose.model('Postulation', schema);

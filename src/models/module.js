const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  moduleId: {
    type: String,
    required: true,
  },
  sensors: {
    humity: {
      h_01: { type: Number, default: 0 },
      h_02: { type: Number, default: 0 },
      h_03: { type: Number, default: 0 },
      h_04: { type: Number, default: 0 },
    },
    vlvs: { type: Number, default: 0 },
    rain: { type: Number, default: 0 },
    sun: { type: Number, default: 0 },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Crear el modelo 'Module' basado en el esquema
const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;

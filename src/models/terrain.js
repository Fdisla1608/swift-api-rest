const mongoose = require('mongoose');

const terrainSchema = new mongoose.Schema({
  terrainId: {
    type: String,
    required: true,
  },
  terrainName: {
    type: String,
    required: true,
  },
  location: [
    {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Terrain = mongoose.model('Terrain', terrainSchema);
module.exports = Terrain;

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  embed: String,
  pdf: String,
  artist: String,
  category: String,
  checked: Number,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Songs', songSchema);

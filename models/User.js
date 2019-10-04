// User Data Model
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  balance: {
    type: Number,
    default: 5000
  },
  date: {
    type: Date,
    default: Date.now
  },
  owned: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('user', UserSchema);

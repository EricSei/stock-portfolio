const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  action: {
    type: String,
    default: 'buy'
  },
  date: {
    type: Date,
    default: Date.now
  },
  ticker: {
    type: String
  },
  shares: {
    type: String
  },
  cost: {
    type: Number
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);

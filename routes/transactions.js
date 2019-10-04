const express = require('express');
const router = express.Router();

const transaction = require('../models/Transaction');

router.get('/', (req, res) => {
  res.send('Transaction API');
});

router.post('/create', (req, res, next) => {
  const user = req.user ? req.user._id : null;
  const action = req.body.action;
  const ticker = req.body.ticker;
  const shares = req.body.shares;
  const cost = req.body.cost;

  const newTransaction = new transaction({
    user: user,
    action: action,
    ticker: ticker,
    shares: shares,
    cost: cost
  });

  newTransaction.save(err => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

const transaction = require('../models/Transaction');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  res.send('Transaction API');
});

router.get('/all', auth, (req, res, next) => {
  const userId = req.user.id;

  transaction.find({ user: userId }, (err, results) => {
    if (err) next(err);

    res.json(results);
  });
});

// owned stock
router.post('/create', auth, (req, res, next) => {
  const userId = req.user.id;
  const action = req.body.action;
  const ticker = req.body.ticker.toUpperCase();
  const shares = parseInt(req.body.shares, 10);
  const cost = parseInt(req.body.cost, 10);

  const newTransaction = new transaction({
    user: userId,
    action: action,
    ticker: ticker,
    shares: shares,
    cost: cost
  });

  User.findOne({ _id: userId }, (err, foundUser) => {
    if (err) return next(err);
    let owned = foundUser.owned;

    if (owned[ticker]) {
      owned[ticker].shares += shares;
      owned[ticker].worth += shares * cost;
    } else {
      owned[ticker] = { ticker: ticker, shares: shares, worth: shares * cost };
    }

    let newData = foundUser;
    newData.owned = owned;

    newData.balance -= shares * cost;

    User.updateOne(
      { _id: userId },
      newData,
      { upsert: true },
      (error, updatedUser) => {
        if (error) next(err);

        newTransaction.save(err => {
          if (err) return next(err);
          res.json({ msg: true });
        });
      }
    );
  });
});

module.exports = router;

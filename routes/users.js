const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jsonToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const auth = require('../middleware/auth');

router.get('/register', (req, res) => {
  res.send('Hi Users');
});

//get balance API
router.get('/balance', auth, (req, res, next) => {
  const userId = req.user.id;

  User.findOne({ _id: userId }, (err, foundUser) => {
    if (err) return next(err);
    res.json(foundUser.balance);
  });
});

router.get('/owned', auth, (req, res, next) => {
  const userId = req.user.id;

  User.findOne({ _id: userId }, (err, foundUser) => {
    if (err) next(err);

    res.json(foundUser.owned);
  });
});

router.get('/user', auth, (req, res, next ) => {
  const userId = req.user.id;

  User.findOne({ _id: userId }, (err, foundUser) => {
    if (err) next(err);

    res.json(foundUser.name);
  });
});

// Register New User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.send('User Already Exist.');
    }
    user = new User({ name, email, password });

    //Hash Password and save to user
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    user.password = hashed_password;

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    //Create Json Web Token
    jsonToken.sign(
      payload,
      config.get('JWT_SECRET'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jsonToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

router.get('/', (req, res) => {
  res.send('Hi Users');
});

// Register New User
router.post('/', async (req, res) => {
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
        res.json(token);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

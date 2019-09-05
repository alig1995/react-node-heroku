const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//get the user model
const User = require('../../models/User')
// @url   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profiles Works' }));

router.post('/register', (req, res) => {
  // const { errors, isValid } = validateRegisterInput(req.body);

  // // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  console.log(req.body.email);
  
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // errors.email = 'Email already exists';
      return res.status(400).json({email:'email already exists'});
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      console.log(newUser);
      

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          console.log(newUser);
          
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
  // console.log(req.body);
  
});


module.exports = router;
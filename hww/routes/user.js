const express = require('express');
const router = express.Router();

const User = require('../model/User');

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  '/signup',
  async (req, res) => {

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });

      user = new User({
        username,
        email,
        password,
      });



      await user.save();

      res.json({message: "User Saved"});


 
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Error in Saving');
    }
  }
);

module.exports = router;



// const express = require("express");
// const router = express.Router();

// const User = require("../model/User");

// router.route('/register').post(
//     (req,res) => {
//         var user = new User({
//             usename: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//           });
//         user.save()
//     }
    
// )

// module.exports = router;
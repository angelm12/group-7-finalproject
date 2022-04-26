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

    const { username, password, realname, email } = req.body;
    try {
      let user = await User.findOne({
        email,
      });

      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }

      user = new User({
        username,
        password,
        realname,
        email
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
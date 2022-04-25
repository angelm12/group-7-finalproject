const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post(
    "/register",
    (req,res) => {
        const { username, email, password } = req.body;
        var user = new User({
            username,
            email,
            password,
          });
        user.save()
    }
    
)

module.exports = router;
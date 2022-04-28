const express = require('express')
const { check, validationResult } = require('express-validator');
const router = express.Router()
const User = require('../model/User')
const PublicUser = require('../model/PublicUser')
const isImageUrl = require('is-image-url');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 1
const auth = require('../middleware/auth');
// const res = require('express/lib/response');


router.post(
    '/register',
    async (req, res) => {
            console.log("requested register")
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            // we look up user by username, not email
            User.findOne({ username: req.body.username}, function (err, user) {
                if (err) {
                    res.status(400).json({error: err})
                } else {
                    if (user) {
                        return res.status(400).json({error: err, msg: "User already exists"})
                    } else {
                        const user = new User({
                            username: req.body.username,
                            password: req.body.password,
                            realname: req.body.realname,
                            email: req.body.email
                        })

                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(password, salt);

                        // await user.save();

                        
                   
                        
                        // will change to profile
                        const publicUser = new PublicUser({
                            username: req.body.username,
                            realname: req.body.realname,
                            email: req.body.email
                        })
                        
                        let picture = req.body.pfp

                        if (picture != "") {
                            if (isImageUrl(picture)) {
                                user.profilepic = picture
                                publicUser.profilepic = picture
                            }
                        } 

                        // organized in this way so that we don't send two responses upon success
                        
                        // save public profile first
                        publicUser.save((err)=>{
                            if (err) {
                                return res.status(400).json({error: err, message: "public user save error"})
                            } else {
                                // save account info as well now and return auth token for account
                                user.save((err)=>{
                                    if (err) {
                                        return res.status(400).json({error: err, message: "private account save error"})
                                    } else {
                                        const payload = {
                                            user: {
                                                id: user.id
                                            }
                                        };
                            
                                        jwt.sign(
                                            payload,
                                            "randomString", {
                                                expiresIn: 10000
                                            },
                                            (err, token) => {
                                                if (err) throw err;
                                                res.status(200).json({
                                                    token, message:  "success of saving private and public and sending token"
                                                });
                                            }
                                        );
                                    }
                    
                                });

                            }
            
                        });
                    }
                }
            })
        })
                    
                        


    router.post('/login',  )

    //     router.post('/login',
    //     (req, res) => {
    //         console.log("requested login")
    //         const password = req.body.password
    //         User.findOne({ username: req.body.username}, function (err, user) {
    //             if (err) {
    //                 res.status(400).json({error: err})
    //             } else {
    //                 if (user) {
    //                     hashedPwd = user.password
    //                     bcrypt.compare(req.body.password, hashedPwd, function(err, correct) {
    //                         if (err) {
    //                             res.status(400).json({error: err})
    //                         } else {
    //                             if (correct) {
    //                                 jwt.sign({uid: user.id}, secretKey, (err, token) => {
    //                                     res.status(200).json({message: "success", token: token, user: user})
    //                                 })
    //                             } else {
    //                                 res.status(401).json({error: "Incorrect Password!"})
    //                             }
    //                         }
    //                     });
    //                 } else {
    //                     res.status(401).json({error: "Incorrect Username!"})
    //                 }
    //             }
    //         });
            
    //     }
    // )

    module.exports = router
     
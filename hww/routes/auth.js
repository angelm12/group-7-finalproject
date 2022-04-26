const express = require('express')
const router = express.Router()
const User = require('../model/User')
const PublicUser = require('../model/PublicUser')
const isImageUrl = require('is-image-url');
const res = require('express/lib/response');

router.post(
    '/register',
    (req, res) => {
            console.log("requested register")

            User.findOne({ username: req.body.username}, function (err, user) {
                if (err) {
                    res.status(400).json({error: err})
                } else {
                    if (user) {
                        res.status(400).json({error: err})
                    } else {
                        const user = new User({
                            username: req.body.username,
                            password: req.body.password,
                            realname: req.body.realname,
                            email: req.body.email
                        })

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
                        user.save((err)=>{
                            if (err) {
                                res.status(400).json({error: err, message: "private user save error"})
                            } else{
                                publicUser.save((err)=>{
                                    if (err) {
                                        return res.status(400).json({error: err, message: "public user save error"})
                                    } else {
                                        res.status(200).json({message: "success of saving private and public"})
                                    }
                    
                                });
                            }
            
                        });

                        

                    }
                }
            })
        })
                    
                        


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
     
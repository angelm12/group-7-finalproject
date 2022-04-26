const express = require('express')
const router = express.Router()
const User = require('../model/User')
const isImageUrl = require('is-image-url')

router.get(
    '/myprofile',
    async (req,res) => {
        User.findById(req.user.uid, (err, userProfile) => {
            if (err) res.json(err)
            res.json(userProfile)
        
        })
    }
)

router.post(
    '/updateProfilePic',
    async (req,res) => {
        let picture = req.body.pfp
        console.log("UPDATE PROFILE PIC")
        console.log(picture)
        if (picture != "") {
            if (isImageUrl(picture)) {
                User.findByIdAndUpdate(req.user.uid, { profilepic: picture }, (err, result) => {
                    if (err) {
                        res.send(err)
                    } else {
                        console.log("found")
                        res.json({message: "success", result})
                    }
                })
            } else {
                res.statusCode(404)
            } 
        } else {
            res.statusCode(404)
        }
    }
)

router.put(
    '/like', 
    (req, res) => {
        User.findByIdAndUpdate(req.body.id, {$push: {'likes': req.body.username}}, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                console.log("found")
                res.json(result)
            }
        })
    }
)

router.put(
    '/dislike', 
    (req, res) => {
        User.findByIdAndUpdate(req.body.id, {$push: {'dislikes': req.body.username}}, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                console.log("found")
                res.json(result)
            }
        })
    })

router.get(
    '/get-people', 
    (req, res) =>  {
        User.findById(req.query.id, (err, userProfile) => {
            const allProfiles = {
                profiles: []
            }
            PublicUser.find({'_id': { $nin: userProfile.likes}}, (err, Profiles) => {
                for (const profile of Profiles) {
                    if (!userProfile.dislikes.includes(profile.username)) {
                        allProfiles.profiles.push(profile)
                    } 
                }
                res.json(allProfiles)
            })
            
        })
    })

module.exports = router


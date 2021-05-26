const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const tokenAuth = require("../middleware/tokenAuth")

router.post("/signup", (req, res) => {
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(newUser => {
        res.json(newUser)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err })
    })
})

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(403).json({ message: "auth failed" })
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(403).json({ message: "auth failed" })
        } else {
            const token = jwt.sign({
                name:user.name,
                email:user.email,
                id:user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"2h"
            })
            res.json({token, user })
        }
    })
})

router.get("/secretclub", tokenAuth,(req, res) => {
    res.json(req.user);
})

router.get("/profile",tokenAuth,(req,res)=>{
    User.findOne({
        where:{
            id:req.user.id
        }
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        req.status(500).json({message:"error",err})
    })
})

module.exports = router;
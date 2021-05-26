const express = require('express');
const router = express.Router();
const { User,Tank,Fish } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const tokenAuth = require("../middleware/tokenAuth")

router.post("/signup", (req, res) => {
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(newUser => {
        const token = jwt.sign({
            name:newUser.name,
            email:newUser.email,
            id:newUser.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"2h"
        })
        res.json({token, user:newUser })
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
            console.log('user not found')
            return res.status(403).json({ message: "auth failed" })
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            console.log(req.body.password);
            console.log("passwords dont match")
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
        },
        include:[{
            model:Tank,
            include:[Fish]
        },
        Fish
    ]
    }).then(userData=>{
        return res.json(userData)
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({message:"error",err})
    })
})

module.exports = router;
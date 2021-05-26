const express = require('express');
const router = express.Router();
const {Tank,Fish} = require('../models');
const tokenAuth = require("../middleware/tokenAuth")

router.get("/",(req,res)=>{
    Tank.findAll(
        {include:[Fish]}
    ).then(tanks=>{
        res.json(tanks)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"error",err})
    })
})

router.get("/:id",(req,res)=>{
    Tank.findOne({
        where:{
            id:req.params.id
        },
        include:[Fish]
    }).then(tank=>{
        res.json(tank)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"error",err})
    })
})
router.post("/",tokenAuth,(req,res)=>{
    Tank.create({
        name:req.body.name,
        UserId:req.user.id
    }).then(tank=>{
        res.json(tank)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"error",err})
    })
})

router.put("/:id",tokenAuth,(req,res)=>{
    Tank.findOne({
        where:{
            id:req.params.id
        }
    }).then(tank=>{
        if(tank.UserId!== req.user.id){
            return res.status(403).json({message:"not your tank!"})
        }
        Tank.update({
            name:req.body.name
        },{
            where:{
                id:req.params.id
            }
        }).then(editTank=>{
            res.json(editTank)
        }).catch(err=>{
            res.status(500).json({message:"error",err})
        })
    })
})
router.delete("/:id",tokenAuth,(req,res)=>{
    Tank.findOne({
        where:{
            id:req.params.id
        }
    }).then(tank=>{
        if(tank.UserId!== req.user.id){
            return res.status(403).json({message:"not your tank!"})
        }
        Tank.destroy({
            where:{
                id:req.params.id
            }
        }).then(delTank=>{
            res.json(delTank)
        }).catch(err=>{
            res.status(500).json({message:"error",err})
        })
    })
})

module.exports = router;
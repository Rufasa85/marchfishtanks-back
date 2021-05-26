const express = require('express');
const router = express.Router();
const {Fish} = require('../models');
const tokenAuth = require("../middleware/tokenAuth")

router.get("/",(req,res)=>{
    Fish.findAll().then(fishes=>{
        res.json(fishes)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"error",err})
    })
})

router.get("/:id",(req,res)=>{
    Fish.findOne({
        where:{
            id:req.params.id
        }
    }).then(fish=>{
        res.json(fish)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"error",err})
    })
})
router.post("/",tokenAuth,(req,res)=>{
    Fish.create({
        name:req.body.name,
        color:req.body.color,
        width:req.body.width,
        UserId:req.user.id,
        TankId:req.body.tankId
    }).then(fish=>{
        res.json(fish)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"error",err})
    })
})

router.put("/:id",tokenAuth,(req,res)=>{
    Fish.findOne({
        where:{
            id:req.params.id
        }
    }).then(fish=>{
        if(fish.UserId!== req.user.id){
            return res.status(403).json({message:"not your fish!"})
        }
        Fish.update({
            name:req.body.name,
            color:req.body.color,
            TankId:req.body.tankId,
            width:req.body.width
        },{
            where:{
                id:req.params.id
            }
        }).then(editFish=>{
            res.json(editFish)
        }).catch(err=>{
            res.status(500).json({message:"error",err})
        })
    })
})
router.delete("/:id",tokenAuth,(req,res)=>{
    Fish.findOne({
        where:{
            id:req.params.id
        }
    }).then(fish=>{
        if(fish.UserId!== req.user.id){
            return res.status(403).json({message:"not your fish!"})
        }
        Fish.destroy({
            where:{
                id:req.params.id
            }
        }).then(delFish=>{
            res.json(delFish)
        }).catch(err=>{
            res.status(500).json({message:"error",err})
        })
    })
})

module.exports = router;
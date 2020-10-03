const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const RequireLogin = require("../middleware/RequireLogin");
const Post=mongoose.model("post");
const User=mongoose.model('User');

router.get('/user/:id',RequireLogin,(req,res)=>{
     User.findOne({_id:req.params.id})
     .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
     })
     .catch(err=>{
         return res.status(400).json({error:"user not found"})
     })
})
module.exports=router;
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {JWT_SECRET}=require('../config/Keys');
const RequireLogin=require("../middleware/RequireLogin")

router.post('/signup',(req,res)=>{
    const{name,email,password}=req.body;
    if(!name || !email || !password){
         return res.status(422).json({error:'Please provide all the details'});
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
           return  res.status(422).json({error:"user already exist"})
        }
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            const user=new User({
                email,
                name,
                password:hashedPassword
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err);
            })
        }
        )
      
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:'Please provide email and password'});
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:'Invalid email or Password'})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {_id,name,email}=savedUser; 
                res.json({token,user:{_id,email,name}})
            }else{
                return res.status(422).json({error:"Invalid  password"});
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
})


module.exports=router;
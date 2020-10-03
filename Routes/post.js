const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const Post=mongoose.model("post");
const RequireLogin=require('../middleware/RequireLogin');
const { route } = require('./auth');

router.get('/allpost',RequireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/mypost',RequireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        console.log(mypost)
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createpost',RequireLogin,(req,res)=>{
    const {title,body,url}=req.body;
    if(!title ||!body || !url){
        return res.status(422).json({error:"please fill all fields"});
    }
    req.user.password=undefined
    const post =new Post({
        title,
        body,
        photo:url,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result});
    })
    .catch(err=>{
        console.log(err);
    })
})

router.put('/like',RequireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
             res.json(result);
        }
    })

})
router.put('/unlike',RequireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
             res.json(result);
        }
    })

})
router.put("/comments",RequireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})

        }else{
            res.json(result)
        }
    })
})
router.delete("/deletepost/:postId",RequireLogin,(req,res)=>{
    // Post.find({_id:req.params.postId})
    // .populate("postedBy","_id")
    // .exec((err,post)=>{
    //     if(err|| !post){
    //         return res.status(422).json({error:err})
    //     }
    //     if(post.postedBy._id.toString()===req.user._id.toString()){
    //         post.remove()
    //         .then(result=>{
    //             res.json({message:"successfully deleted"})
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //         })
    //     }
    // })
    Post.findById(req.params.postId)
    .then(post=>{
            post.remove()
            .then(result=>{
                res.json({message:"successfully removed"})
            })
            .catch(err=>{
                console.log(err);
            })
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports=router

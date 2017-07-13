const express=require('express');
const route=express.Router();
const User=require('../models/user')
const passport=require('passport')
const jwt=require('jsonwebtoken')
const config=require('../config/database')

route.post('/register',(req,res,next)=>{
    let newUser=new User({
        name : req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });
    User.addUser(newUser,(err,user)=>{
        if(err){
            res.json({
               success:false,
               message:'Failed to register the User' 
            });
        }
        else{
            res.json({
               success:true,
               message:'User registered' 
            });
        }

    })
})
route.post('/authenticate',(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;
    User.getUserByUsername(username,(err,user)=>{
        if(err) throw err;
        if(!user)
        return res.json({success: false,msg:"user not found"});

        console.log(user.password)

        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token=jwt.sign(user,config.secret,{
                    expiresIn:60480000
                });

                res.json({
                    success: true,
                    token:'JWT '+ token,
                    user:{
                        id:user._id,
                        username:user.username,
                        email:user.email
                    }
                })
            }else{
                return res.json({success: false,msg:"Wrong Password"});
            }
        });    
    })
})
route.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user})
});

module.exports=route;
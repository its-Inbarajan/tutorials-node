const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({


    email :{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required:true
    },
    password :{
        type: String,
        min: 4,
        max: 20,
        required:true
    },
    
    username :{
        type: String,
        trim: true,
        min: 3,
        max:25,
        required:true
    },
    
   
    role:{
        type: String,
        // required:true
    },
   gender:{
        type: String,
        required:true
    },
    phone:{
        type: String,
         required:true
    }

    
}, {timestamps : true});

module.exports =new mongoose.model('hrms_userss', userSchema);  


const express = require('express');

const user = 
[
    {
        id : '1', 
        email : "rajaninba@gmail.com",
        password : 123456
    },
    {
        id : '2', 
        email : "hr@gmail.com",
        password : 1234567890
    }
]

module.exports = user;
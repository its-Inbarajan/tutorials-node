const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({

    // username :{
    //     type: String,
    //     trim: true,
    //     min: 3,
    //     max:25,
    //     required:true
    // },
    
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
//     role:{
//         type: String,
//         // required:true
//     },
//    gender:{
//         type: String,
//         required:true
//     },
//     phone:{
//         type: String,
//          required:true
//     }

    
}, {timestamps : true});

module.exports =new mongoose.model('hrms_userss', userSchema);  
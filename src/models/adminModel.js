const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

    // username: { type: String },
    email: { type: String },
    password: { type: String },
    // role: { type: String },
    // gender: { type: String },
    // phone: { type: String },
    // token:{type : String}

})

const adminModel = new mongoose.model('A_admin', adminSchema)
module.exports = adminModel 
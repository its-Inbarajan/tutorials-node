 const valid  = require('node-input-validator');
 const bcrypt = require('bcrypt');
 const jwt = require("jsonwebtoken");
const user = require('../models/user');


  const change_password = async (req, res)=>{
    try {
        const v = new valid(req.body, {
            old_password: 'required',
            new_password: 'required',
            confirm_password: 'required | same:new_password'
        });
        const matched = await v.check();
    
        if(!matched) {
            return res.status(422).send(v.errors);
        }
        let current_user = req.user;
        if (bcrypt.compareSync(req.body.old_password, current_user.password)) {
          
            let hashPassword = bcrypt.hashSync(req.body.new_password,10)
              await user.updateOne({
                _id:current_user._id
             },{
                password:hashPassword
             });
            
             let userData = await user.findOne({_id:current_user._id})

             let jwt_secret = SECRET_KEY || 'mysecret';
             let token = jwt.sign({
                data:  userData
             }, jwt_secret);

             return res.stauts(200).send({
                message:'password successfully updated',
                data: userData,
                token: token
             });

        }else{
            return res.status(400).send({
                message:'password does not matched',
                data: {}
            })

        }

    } catch (err) {
        return res.status(400).send({
            message:err.message,
            data:err
        });
        
    }
   
 }
module.exports= {change_password};
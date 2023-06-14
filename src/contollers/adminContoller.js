const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');
const SECRET_KEY = "HRMSPRO";


const adminReg =  async(req, res) =>{
    try {
        // let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        // let role = req.body.role;
        // let gender = req.body.gender;
        // let phone = req.body.phone;
        const existinguser = await adminModel.findOne({ email : email ,username: username });
        if(existinguser){
            return res.status(200).json({message: "user already exists",status: false});
        }
        else if(username && email && password && role && gender && phone){
            const result = {
                // username:username,
                email : email,
                password : await bcrypt.hash(password,10),
                // role : role,
                // gender : gender,
                // phone : phone
            }
            const data = await adminModel.create(result)
            if (data) {
                const token = jwt.sign({email : data.email, id : data._id},SECRET_KEY);
                if (token) {
                    const updateToken = await adminModel.findOneAndUpdate({_id: data.id},{$set : {token : token}})
                    res.status(200).json({message:'Register Successfully',status:true,data:data})
                }else{
                    res.status(200).json({message:'some error in toke generation',status:false})
                }
            }else{
                res.status(200).json({message:'Some Error! Try Again Later',status:false})
            }
        }else{
            res.status(200).json({message:'Some Field is missing',status:flase})
        }
        // const hashedPassword = await bcrypt.hash(password, 10);


        // const result = await adminModel.create({
        //     email: req.body.email,
        //     password: hashedPassword,
        //     username: req.body.username,
        //     role: req.body.role,
        //     gender: req.body.gender,
        //     phone: req.body.phone,
        // //    token:token
        // }); 

        // const token = jwt.sign({email : result.email, id : result._id},SECRET_KEY);
        // console.log(token.id);
        // res.status(200).json({user: result,token: token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
}


module.exports = {adminReg}
const userModel = require('../models/user');
//const forModel = require('../models/froget');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "HRMSPRO";

    
// signup
const register =  async(req, res) =>{
    const{username, email, password, role, gender, phone} = req.body;
    try {
        const existinguser = await userModel.findOne({ email : email ,username: username });
        if(existinguser){
            return res.status(200).json({message: "user already exists",status: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            role: req.body.role,
            gender: req.body.gender,
            phone: req.body.phone,
           
        }); 

        const token = jwt.sign({email : result.email, id : result._id},SECRET_KEY);
        res.status(200).json({user: result,token: token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
}


//signin
const login = async(req, res) => {

    const{email, password} = req.body;

    try {
        
        const existinguser = await userModel.findOne({email : email});
        if(!existinguser){
            return res.status(200).json({message: "user not found",status: false});
        }
        
        
        const matchPassword = await bcrypt.compare(password, existinguser.password);
        if(!matchPassword){
            return res.status(200).json({message : "Invalid password", status: false})
        }

        
        const token = jwt.sign({email : existinguser.email, id : existinguser._id},SECRET_KEY);
        res.status(200).json({user: existinguser,token: token});

        // if (email === "hr@gmail.com") {
        //     const data = await userModel.find()
        //     res.json({data : data})  
        // }  

        // const hrt = "63bcf08b78405b9cf571c916";
        // if( 
        //      existinguser._id === hrt) {
        //     const data = await userModel.find()
        //     res.json({data : data})
        //  }
    //     const hrtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhyQGdtYWlsLmNvbSIsImlkIjoiNjNiY2YwOGI3ODQwNWI5Y2Y1NzFjOTE2IiwiaWF0IjoxNjczNDIwNzYwfQ.ZxGmfwWDrfaKiilHVemX9bTN_7CZXH2Yei98JoDOfO8";
    //     const hrlog = await userModel.findOne({email : email.token, hrtoken});
    //     if (hrlog == true) {
    //         const data = await userModel.find()
    //         res.json({data: data}) 
    //     }

       
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong"});

    }
    
}

const getUser = async (req,res) => {
    console.log(req.params);
    let token = jwt.decode(JSON.parse(req.headers.authorization,'node'))
    console.log(token);
    
    try {
    userModel.findOne({_id:token.id}, (err,data) => {
            if (!err) {
                res.status(200).send({data:data})
            }

           
        })
    } catch (error) {
        
    }
}





const view = async(req, res)=> {
    try{
        const data = await userModel.find({_id: req.body.id})
        res.status(200).send({data: data})
    } catch(error) {
        res.json({error : error})
    }
}

const update  =  async(req, res) => {
    try {
        console.log(req.body);
        const data = await userModel.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        )
        console.log(req.body);
        if(data.modifiedCount>0){
            res.status(200).send({data:data,message:'successfull', success:true})

            
        }
        else{
            res.status(400).send({message:'failed',success:false})
        }
    } catch (error) {
        
        throw error
    }
}


const deleted = async(req, res) =>{
    try{
        const query = {_id: req.params.id};
        console.log(query)
        const result = await userModel.deleteOne(query);

        if(result.deletedCount === 1) {
            console.log("successfully deleted one document:");
            res.status(200).send({message:' deleted successfully', status:true})
        }else{
            res.send("no document matched the query. Deleted 0 documents");
        }
    } catch(error){
        res.status(500)
    }
}
const show = async(req, res, next) =>{
    try{
        const data = await userModel.find()
        res.json({data : data})
    }catch(error){
        res.json({error : error})
    }
}


module.exports ={getUser, register ,login,  view,  update, deleted, show};

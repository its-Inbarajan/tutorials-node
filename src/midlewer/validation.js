//const validationSchema = require("../../modelValidation")

const { validationSchema } = require("../../modelValidation")

class mValidation{
    static userModelValidation = async(req,res, next)=>{
    try {
        console.log("here");
        const data = await validationSchema.modelValidation.validate(req.body)
            if(data.error){
                res.status(200).json({message: 'faild',success:false,data:data.error[0].details})
              
            }
            else{
                console.log("next");
                next()  
            }
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    }
}
module.exports = {mValidation};
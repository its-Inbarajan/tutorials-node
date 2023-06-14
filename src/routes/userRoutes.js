const express =  require("express");
const userRouter = express.Router();
const  userController = require('../contollers/userControllers');
const { mValidation } = require("../midlewer/validation");

userRouter.post('/register',mValidation.userModelValidation,userController.register)
userRouter.post('/login',userController. login);
userRouter.put('/update/:id',userController. update);
userRouter.delete('/delete/:id',userController. deleted);
userRouter.post('/view',userController. view);
userRouter.post('/show',userController. show);
userRouter.get('/getUser',userController. getUser);



module.exports = userRouter;

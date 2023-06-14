const express = require("express");
const Cors = require('cors');
const mongoose = require("mongoose");
const admiRrouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoutes");
const app = express(); 
app.use(express.json());
app.use(Cors());
const  socket = require("socket.io");

app.use('/user', userRouter);
app.use('/admin',admiRrouter)

//roter
app.get('/',(req, res) =>{
    res.send("hello");
});

const server = app.listen(4200, () => {
    console.log("server is running port 4200");
   
});
mongoose.connect('mongodb://127.0.0.1:27017/android')
.then(()=>{
        console.log("Db is connected");
})
.catch((error)=>{
    console.log(error);
})

// const db = mongoose.connection;
// db.on("error", console.error.bind(console,"connection error:"));
// db.once("open",function () {
//     console.log("connected successfully");
// });

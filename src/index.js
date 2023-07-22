const express = require("express");
const Cors = require('cors');
const mongoose = require("mongoose");
const admiRrouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoutes");
const app = express(); 
const  socket = require("socket.io");
const { path } = require("path");
const port = 4200;
// const db=require('./config/config').get(process.env.NODE_ENV);
const db = require('./config').get(process.env.NODE_ENV)


//roter

app.use('/user', userRouter);

app.use('/admin',admiRrouter)

app.use(express.json());

app.use(Cors());
    
app.use(express.static(process.cwd()+"/tutorials/docs/tutorials/"));

const server = app.listen(port,() => {
    console.log(`server is running port 4200  http://localhost:${port}`);
});



// mongoose.connect('mongodb:// 192.168.186.95:4200/android')
mongoose.Promise=global.Promise;

mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});

// const db = mongoose.connection;
// db.on("error", console.error.bind(console,"connection error:"));
// db.once("open",function () {
//     console.log("connected successfully");
// });

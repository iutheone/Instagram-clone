const express=require('express');
const mongoose=require('mongoose');
const app=express();
const {MONGOURI}=require('./config/Keys')
const PORT=process.env.PORT||4000;

//Mongodb Connection
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected',()=>{
    console.log('connected to mongodbURl');
})

mongoose.connection.on("error",(err)=>{
    console.log(err);
})

require('./models/user');
require('./models/post')
app.use(express.json())
app.use(require('./Routes/auth'));
app.use(require('./Routes/post'));
app.use(require('./Routes/user'));

if(process.env.NODE_ENV=='production'){
    app.use(express.static('instagram-client/build'));
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'instagram-client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log("App is running on port 4000");
})
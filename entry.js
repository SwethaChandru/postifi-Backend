var path=require('path');
var express= require('express');
var mongoose=require('mongoose');
const bodyparser = require('body-parser');
var cors=require('cors');

var app=express();
app.use(cors({}));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true })); 

    
mongoose.connect('mongodb://localhost:27017/website',{useNewUrlParser:true},(err)=>{
    if(err)
    {
        console.log("error during connection");
    }
    else
    {
        console.log("connected to mongodb");
    }
});

app.use("/images",express.static(path.join("images")));

const PORT=3000;

const proute=require('./routes/postRoute');
const uroute=require('./routes/userRoute');

app.use('/api',proute);
app.use('/user',uroute);


app.listen(PORT,()=>{
    console.log('server has been started at port:'+PORT);
});

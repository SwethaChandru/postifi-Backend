const mongoose=require('mongoose');

var PostSchema=mongoose.Schema({
    userId:{
        type:String
    },
    title:{
        type:String
    },
    content:{
        type:String
    },
    image:{
        type:String
    }
});

module.exports=mongoose.model('page',PostSchema);
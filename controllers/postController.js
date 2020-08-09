const post = require('../models/postModel');
const multer=require('multer');
const { Error } = require('mongoose');

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpg'
}

const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(file.mimetype);
        const isValid=MIME_TYPE_MAP[file.mimetype];
        let error=new Error("invalid mime type");
        if(isValid)
        {
            error=null;   
        }
         cb(error,"images");
    },
    filename:(req,file,cb)=>{
        const name=file.originalname.toLowerCase(); //.split('').join('-');
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null,name+'-'+Date.now()+'.'+ext);
    }
})

module.exports.getMyPost=(req,res)=>{
    post.find({userId:req.params.id},(err,items)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send(items);
        }
    })
}

module.exports.add =(req, res) => {
    console.log("hello");
    let upload=multer({storage:storage}).single("image");
    upload(req,res,function(err){
    console.log("add");
    console.log(req.body);
    let newPost = new post();
    //console.log(req.body.image);
    const url=req.protocol+'://'+req.get("host");
    newPost.title = req.body.title,
    newPost.content = req.body.content,
    newPost.userId=req.body.userId,
    newPost.image=url+"/images/"+req.file.filename
    newPost.save((err, item) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json("item has been added succesfully");
        }
    })

    })
}
    
module.exports.getPost = (req, res) => {
    post.find({}, (err, docs) => {
        if (err) {
            res.json(err)
        } else {
            res.json(docs)
        }
    })
}

module.exports.getOne = (req, res) => {
    post.findById(req.params.id,function(err, docs) {
        if (err) {
            res.json(err)
        } else {
            res.json(docs)
        }
    })
}
module.exports.deletePost=(req,res)=>{
    post.findByIdAndRemove(req.params.id,function(err,deletedvideo){
        if(err)
        {
            res.send("error deleteing video");
        }
        else
        {
            res.send(deletedvideo);
        }
    })
}
module.exports.updateNew=(req,res)=>{
    let upload=multer({storage:storage}).single("image");
    upload(req,res,function(err){
    console.log(req.body);
    let image=req.body.image;
    if(req.file)
    {
        const url=req.protocol+'://'+req.get("host");
        image=url+"/images/"+req.file.filename;
    }
    post.findByIdAndUpdate(req.params.id,
        {
            $set:{ "title": req.body.title, "content": req.body.content,"image":image} 
        },
        {
            upsert:true,new:true
        },
        function(err,updatedVideo){
            if(err)
            {
                console.log("error updating video");
            }
            else
            {
                res.json(updatedVideo);
            }
        })
    })
}

const bycrypt=require('bcrypt');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');


module.exports.add=(req,res)=>{
    bycrypt.hash(req.body.password,10)
        .then(hash=>{
            const user=new User({
                email:req.body.email,
                password:hash
            });
            user.save((err,items)=>{
                if(err)
                {
                    res.status(401).json({
                        success:false,
                        message:'error'
                    });
                }
                else
                {
                    res.status(200).json({
                        success:true,
                        message:'succesfully sign up'
                    });
                }
            })
              .catch(err=>{
                    res.status(500).json({
                        error:err
                    })
                })
        })
}

module.exports.adduser=(req,res)=>{
    let fetchedUser;
    User.findOne({email:req.body.email}).then(user=>{
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"emailnotpresent"
            });
        }
        fetchedUser=user;
        return bycrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json({
               success:false,
               message:"passwordwrong "
            })
        }
        else
        {
            const token=jwt.sign({},'secret_this_should_be_longer',{expiresIn:'1h'});
            res.status(200).json({
            success:true,
            id:fetchedUser._id,
            token:token
        });
        }
        
    })
    .catch(err=>{
        //console.log(err);
        return res.status(401).json({
            success:false,
            message:"Auth failed"
        });
    });
}
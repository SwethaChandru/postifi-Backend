var express=require('express');
var router=express.Router();

const userCon=require('../controllers/userControllers');

router.post('/signup',userCon.add);
router.post('/login',userCon.adduser);

module.exports=router;
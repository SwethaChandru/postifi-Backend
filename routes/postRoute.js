var express=require('express');
var router=express.Router();

const postCon=require('../Controllers/postController');
const checkAuth=require('../middleware/check.auth');
const middleware=require('../middleware/check.auth')

router.post('/newpost',checkAuth,postCon.add);
router.get('/getpost',postCon.getPost);
router.get('/getMyPost/:id',postCon.getMyPost);
router.delete('/deletepost/:id',checkAuth,postCon.deletePost);
router.get('/getpost/:id',postCon.getOne);
router.put('/updatepost/:id',checkAuth,postCon.updateNew);

module.exports=router;
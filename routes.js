const express=require('express');
const app=express();
const router=express.Router();
const Courses=require('./model')
router.get('/courses',async(req,res)=>{
    const result=await Courses.find();
    res.send(result);
})
router.post('/courses',async(req,res)=>{
    const vall={
        name:req.body.name,
        level:req.body.level,
        prerequisite:[req.body.prerequisite]
    }
    const ff=await Courses.findOne({name:req.body.name});
    if(ff==null){
    const val=await Courses.create(vall);
    res.json(val);
    }
    else{
        res.send('Course already exist');
    }

    
})
router.put('/courses:id', async(req,res)=>{
    const result= await Courses.ffindOneAndUpdate({id:req.params.id},req.body);
    res.send(result);
})
router.get('/course-prerequisite',async(req,res)=>{
    
})
module.exports=router;
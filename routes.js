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
router.get('/course-prerequisite/:name',async(req,res)=>{
    const course=await Courses.findOne({name:req.params.name}).populate('prerequisite');
    res.json(course);

})
router.get('/course-available/:name',async(req,res)=>{
    const pre=await Courses.findOne({name:req.params.name});
    if(pre==null){
        res.send('Course is not available in the database');
    }
    else{
    const id=pre.id;
    const courses=await Courses.find({prerequisite: id});
    res.json(courses);
    }
})
module.exports=router;
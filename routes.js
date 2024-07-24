const express=require('express');
const app=express();
const router=express.Router();
const Courses=require('./model')
router.get('/courses',async(req,res)=>{
    const result=await Courses.find();
    res.send(result);
})
router.post('/courses',async(req,res)=>{
    const ff=await Courses.findOne({name:req.body.name});
    if(ff==null){
    console.log('Not exist so creating');
    const val=await Courses.create({
        name:req.body.name,
        level:req.body.level
    });
    const pre=await Courses.findOne({name:req.body.prerequisite});
    if(pre!=null){
        val.prerequisite.push(pre.id);
        await val.save();
    }
    
    res.json(val);
    }
    else{
        console.log(ff);
        const pre=await Courses.findOne({name:req.body.prerequisite});
        if(pre==null){
            res.send('Prerequisite is not found');
        }
        else{
            
            const check=Courses.findOne({name:req.body.name,prerequisite:pre.id});
            if(check==null){
                ff.prerequisite.push(pre.id);
            }
            else{
                res.send('Course already exist with same prerequisite');
            }
        }
       
       
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
router.delete('/courses/:name',async(req,res)=>{
   await Courses.deleteOne({name:req.params.name}).then((result)=>{
        res.send(result);
   });
   
})
module.exports=router;
const mongoose=require('mongoose');

const CourseSchema=mongoose.Schema({
    name:{
        type:String
    },
    level:{
        type:String,
    },
    prerequisite:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Courses"
    }]
})
module.exports=mongoose.model('Courses',CourseSchema);
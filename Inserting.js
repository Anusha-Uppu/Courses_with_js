const Courses=require('./model');
const connection=require('./Connection');
const fs=require('fs');
const csv=require('csv-parser');
class check{
    check(name,level,prerequisite){
       this.name=name;
       this.level=level;
       this.prerequisite=prerequisite;
    }
    

}
const list=[];

async function data_checking(row){
    const result=await Courses.findOne({name:row.name});
    if(result==null){
      console.log('Yes creating new value')
      const c=await Courses.create({name:row.name,level:row.leve});
      if(row.prerequisite_name==null){
         await c.prerequisite.push(null);
      }
      else{
        
        const pre=await Courses.findOne({name:row.prerequisite_name});
        if(pre!=null){
           c.prerequisite.push(pre.id);
           await c.save();
      }
      }
     
      

    }else{
      const pre=await Courses.findOne({name:row.prerequisite_name});
      if(pre==null){
         console.log('The course is not exixting');
      }else{
         // const v=await Courses.findAndUpdate({name:row.name}, prerequisite.push(pre.id));
         const v=await Courses.findOne({name:row.name});
         v.prerequisite.push(pre.id);
         await v.save();
         console.log('Prerequisite is added');
      }
    }

   // const id=await Courses.find();
   // console.log(id.id);
}
async function inserting(){
   await connection();
   fs.createReadStream('/Users/admin/Documents/CODE/Courses_with_js/courses.csv',{
    encoding: 'utf-8'
   }).pipe(csv())
   .on('data', function(row){
      console.log(row);
      list.push(row);
      // console.log(list)
      //  data_checking(row);
     
       console.log("Row name"+row.name);
   }).on('end', async function(){
      console.log("List : ",list)
      for(let item of list){
         await data_checking(item);
         console.log(item);
      }
      console.log('Data inserted successfully');
   }).on('error',()=>{
    console.log("Error");
   })

   //const data = await Courses.find();
   //console.log(data);
}
inserting();
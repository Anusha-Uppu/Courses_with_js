// import connection from "./Connection";
const connection=require('./Connection')
const Courseroutes=require('./routes');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
async function main(){
    console.log('-----Application started-----');
    await connection();
  
    app.use(express.urlencoded({ extended: true }))
    app.use('/api',Courseroutes);
    app.listen(3000,()=>{
        console.log('----Server is running on the port 3000----');
    })
    run();
}

const Courses=require('./model');

async function run(){
    // const course=await Courses.create({name:'SSC'});
    // console.log(course);
    console.log('--Just checking----');

}
main();
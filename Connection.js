const mongoose=require('mongoose');


async function connection(){
    try{
    await mongoose.connect('mongodb://localhost/js20');
    console.log("Connected with the database");
    }catch(err){
        console.log(err);
    }
}
// connection();
module.exports=connection
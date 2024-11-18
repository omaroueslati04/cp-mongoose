const mongoose=require('mongoose');

const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('DataBase is connected !');
    }
    catch (err){
        console.log("Connetion to data base has failed")
    }
}
module.exports=connectdb;
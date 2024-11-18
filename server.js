const express= require ('express');
const app=express();
app.use(express.json());

require('dotenv').config();
const PORT=process.env.PORT;

const connectdb=require('./config/connection');
connectdb();

const persroutes=require('./Routes/personne');
app.use('/personne',persroutes);






















app.listen(PORT,(err)=>{
    if (err){
        console.log(`error, servor is not running !`);
    }
    else
    console.log(`serveur running at ${PORT}`)
});
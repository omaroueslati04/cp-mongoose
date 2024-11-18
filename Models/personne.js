const mongoose=require('mongoose');
const{Schema,model}=mongoose;
const persSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    favoritefood:{
        type:[String],
        required:true
    }
});

module.exports=Personne=model("personne",persSchema);

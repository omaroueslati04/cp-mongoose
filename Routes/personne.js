const express=require('express');
const Personne=require('../Models/personne');
const router=express.Router();

router.post('/add-personne',async(req,res)=>{
    
    try{
        const{name,age,favoritefood}=req.body;
        const newperson= await Personne.create({name,age,favoritefood});
        res.status(200).send({message:'pesonne crée !',personne:newperson});
    }
    catch(err){
        res.status(400).send('error lors de l\'ajout de la personne');

    }});
//afficher tous les personnes
    router.get('/find-personne',async(req,res)=>{
        try{
            const peopletofind=await Personne.find();
            res.status(200).send({message:"les personnes ajoutées a votre base de données sont : ",personnes:peopletofind});
        }
        catch (err){
            res.status(400).send('error lors de la recherche des personnes');
    
        }
    
    })
//rechercher une personne avec un nom donnée en parametre 
    router.get('/find-personne/:name',async(req,res)=>{
    try{
        const nametofind=req.params.name;
        const peopletofind=await Personne.find({name:nametofind});
        if (peopletofind.length==0){
            res.status(200).send({message:"le nom que vous avez entrez ne correspond a aucune perrsonne"});

        }
        else{   
            res.status(200).send({message:"les personnes dont le nom que vous avez besoin sont: ",personnes:peopletofind});
        } 
    }
    catch (err){
        res.status(400).send('error lors de la recherche des personnes');

    }

});

router.get('/favfood/:food',async(req,res)=>{
    try{
        const foodtofind=req.params.food;
        const persontofind=await Personne.findOne({favoritefood:foodtofind});
        if (persontofind){
            res.status(200).send({message:"la personne qui aime le food que vous cherchez est: ",personnes:persontofind});
        }
        else{   
            res.status(200).send({message:"il n'existe pas de personne qui aime ce food "});
        } 
    }
    catch (err){
        res.status(400).send('error lors de la recherche des personnes');

    }
        
});

router.get('/find-personne/:_id',async(req,res)=>{
    try{
        const idtofind=req.params._id;
        const personnetofind=await Personne.findById({_id:idtofind});
        if(personnetofind)
            res.status(200).send({message:"personne trouvé ",personne:personnetofind});
        else
        res.status(200).send({message:"personne non trouvé "});

    }
    catch (err){
        res.status(400).send('error lors de la recherche des personnes');

    }
});

router.put('/update-personne/:_id',async(req,res)=>{
    try{
        personupdated= await Personne.findByIdAndUpdate(req.params._id,{$push:{favoritefood:"hamburger"}},{new:true});
        if(!personupdated)
            res.status(400).send({message:"personne non trouve! "});
        else
            res.status(200).send({message:"contact modifiee",pesonne:personupdated});
        }
    catch(err){
        res.status(400).send({message:"erreur lors de la modification  de la personne "});

            }
});

router.put('/update-personne-age/:nom',async(req,res)=>{
    try{
        personupdated=await Personne.findOneAndUpdate({name:req.params.nom},{age:20},{new:true});

        if(!personupdated)
            res.status(400).send({message:"personne non trouve! "});
        else
            res.status(200).send({message:"contact modifiee",pesonne:personupdated});
        }
    catch(err){
        res.status(400).send({message:"erreur lors de la modification  de la personne "});

            }
});

router.delete('/delete-personne/:_id',async(req,res)=>{
    try{
        const persontodelete= await Personne.findOneAndDelete(_id=req.params._id);
        if(!persontodelete)
            res.status(400).send({message:"personne non trouve! "});
        else
        res.status(200).send({message:"personne supprimeé"});
        }
    catch(err){
        res.status(400).send({message:"erreur lors de la suppression  du personnage"});

    }

    
});
 router.delete('/delete-personne-name/:name',async(req,res)=>{
    try{
        const resultat=await  Personne.deleteMany({name:req.params.name})
        res.status(200).send({message:`tous les personnes ayant un nom :${req.params.name} sont supprimées `,reultat:resultat})
    }
    catch(err)
    {
        res.status(400).send({message:"erreur lors de la suppression  du personnage"});

    }
 });


 router.get('/find-burrito-lovers', async (req, res) => {
    try {
        const people = await Personne.find({ favoritefood: "makrouna" }) 
            .sort({ name: 1 }) 
            .limit(2) 
            .select("-age"); 

        res.status(200).send({
            message: "Résultats des personnes aimant les burritos",
            personnes: people
        });
    } catch (err) {
        res.status(500).send({
            message: "Erreur lors de la recherche des personnes",
            error: err
        });
    }
});


   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    module.exports=router;



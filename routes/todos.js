const express=require("express");
var app=express();
const router= express.Router();
const db=require("../models")



router.get("/",function(req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
    
});
router.post("/",function(req,res){
    
   
   
    db.Todo.create(req.body)
    .then(function(createdTodo){
        
        console.log(createdTodo);
        res.json(createdTodo);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    });
    
});
router.get("/:id",function(req,res){
    db.Todo.findById(req.params.id)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch((err)=>{
        res.json(err);
    });
});
router.put("/:id",function(req,res){
    // var newObj={name:req.body.name,completed:req.body.completed};
    db.Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(function(updatedObj){
        res.json(updatedObj);
    })
    .catch(function(err){
        res.send(err);
    });

});
router.delete("/:id",function(req,res){
    db.Todo.findByIdAndRemove(req.params.id)
    .then(function(){
        res.send("deleted successfully");
    })
    .catch(function(err){
        console.log(err);
    });
});

module.exports=router;
const express=require("express");
const app=express();
var todos=require("./routes/todos.js");

var bodyParser=require("body-parser");

app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/views"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile("index.html")
});

app.use("/api/todos", todos);
app.listen(8000,function(){
    console.log("App is running");
});
const mongoose = require("mongoose");

var todoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:"Todo name is required"
    },
    completed:{
        type:Boolean,
        default:false
    },
    created_date:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model("todo",todoSchema);
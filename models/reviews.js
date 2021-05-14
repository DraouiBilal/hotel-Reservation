const mongoose = require("mongoose")

const reviewSchema=mongoose.Schema({
    text:String,
    stars:Number,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
});

module.exports= mongoose.model("Review", reviewSchema)
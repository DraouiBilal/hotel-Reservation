const mongoose=require("mongoose")

const hotelSchema=new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    stars:Number,
    price:Number,
    totalRooms:Number,
    availableRooms:Number,
    longtitude:Number,
    latitude:Number,
    reviews:[     
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }  
    ]
});

module.exports = mongoose.model("Hotel",hotelSchema)

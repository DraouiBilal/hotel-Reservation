const mongoose=require("mongoose")

const hotelSchema=new mongoose.Schema({
    startDate: Date,
    endDate:Date,
    personalisation:String,
    PersonId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
    },
    HotelId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hotel",
    }
});

module.exports = mongoose.model("Reservation",hotelSchema)

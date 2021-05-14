const express = require("express")
const router = express.Router()
const Hotels = require("../models/Hotels")
const catchAsync = require("../utils/catchAsync")

let hotels

router.post("/search",catchAsync(async (req,res)=>{
    let query = req.body.query
    const hotelRegex = new RegExp(query, 'i')
    hotels = await Hotels.find({name: hotelRegex})
    res.send(hotels)
    console.log(hotels)
}))

module.exports = router
const catchAsync = require("../utils/catchAsync")
const express = require("express")
const router = express.Router({ mergeParams: true })
const middleware = require("../middleWare")
const hotels = require("../models/Hotels")
const reservations = require("../models/reservation")

router.get("/reservation", middleware.isLoggedIn, catchAsync(async (req, res)=> {
    let hotel = await hotels.findById(req.params.id)
    res.render("Reservation/reservation",{hotel,hotel})
}))

router.post("/reservation",middleware.isLoggedIn,catchAsync(async (req,res)=>{
    let hotel = await hotels.findById(req.params.id)
    let reservation = {...req.body,PersonId:req.user._id,HotelId:hotel._id}
    let Reservation = new reservations(reservation)
    Reservation.save()
    req.flash("success","Reservation made")
    res.redirect("/profile")
}))

module.exports = router
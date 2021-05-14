const express = require("express")
const router = express.Router()
const Hotels = require("../models/Hotels")
const middleware = require("../middleWare")
const catchAsync = require("../utils/catchAsync")

router.get("/", async (req, res) => {
    let hotels = await Hotels.find({})
    if (hotels)
        res.render("Hotels/hotels", { hotels: hotels })
    else
        res.redirect("/")
});

router.get("/new", middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    res.render("Hotels/new")
})

router.post("/new", middleware.isLoggedIn, middleware.isAdmin, catchAsync((req, res) => {
    let data = {...req.body,availableRooms:req.body.totalRooms}
    let hotel = new Hotels(data)
    hotel.save()
    req.flash("success","New hotel added")
    res.redirect("/hotels")
}))

router.get("/:id", catchAsync(async (req, res) => {
    let hotel = await Hotels.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: "author"
        }
    })
    if (hotel)
        res.render("Hotels/show", { hotel, hotel })
    else
        res.redirect("/")
}))

router.get("/:id/getCoordinates", catchAsync(async (req, res) => {
    let hotel = await Hotels.findById(req.params.id)
    let coord = {lat:hotel.latitude,lng:hotel.longtitude}
    res.send(coord)
}))

router.get("/:id/edit", middleware.isLoggedIn, middleware.isAdmin, catchAsync(async (req, res) => {
    let hotel = await Hotels.findById(req.params.id)
    if (hotel)
        res.render("Hotels/edit", { hotel, hotel })
    else
        res.redirect("/")
}))


router.put("/:id/edit", middleware.isLoggedIn, middleware.isAdmin, catchAsync(async (req, res) => {
    let Hotel = req.body
    await Hotels.findByIdAndUpdate(req.params.id, Hotel)
    res.redirect("/hotels/" + req.params.id)
}))

router.delete("/:id/delete", middleware.isLoggedIn, middleware.isAdmin, catchAsync(async (req, res) => {
    await Hotels.findByIdAndDelete(req.params.id)
    console.log("Deleted the hotel")
    res.redirect("/hotels")
}))

module.exports = router;
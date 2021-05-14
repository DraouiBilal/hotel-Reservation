const express = require("express")
const router = express.Router({ mergeParams: true })
const reviews = require("../models/reviews")
const hotels = require("../models/Hotels")
const middleware = require("../middleWare")
const catchAsync = require("../utils/catchAsync")

router.get("/new", middleware.isLoggedIn, catchAsync(async (req, res) => {
    let hotel = await hotels.findById(req.params.id)
    if (hotel)
        res.render("Reviews/new", { hotel: hotel })
    else
        res.redirect("/hotels")
}))

router.post("/", middleware.isLoggedIn, catchAsync(async (req, res) => {
    let hotel = await hotels.findById(req.params.id)
    if (hotel) {
        let review = new reviews({ text: req.body.text, stars: req.body.stars })
        review.author.id = req.user._id
        hotel.reviews.push(review)
        await review.save()
        await hotel.save()
        res.redirect("/hotels/" + hotel._id)
    }
    else {
        req.flash("error", "something went wrong")
        res.redirect("/hotels")
    }
}))

router.delete("/:reviewId/delete", middleware.isLoggedIn, middleware.isReviewOwner, catchAsync(async (req, res) => {
    await reviews.findByIdAndDelete(req.params.reviewId)
    let hotel = await hotels.findById(req.params.id)
    console.log("made it this far")
    for (let i = 0; i < hotel.reviews.length; i++) {
        if (hotel.reviews._id == req.params.reviewId)
            hotel.reviews.splice(i, 1)
    }
    res.redirect("/hotels/" + req.params.id)
}))

module.exports = router
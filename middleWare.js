const reviews = require("./models/reviews")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to do that")
        res.redirect("/login")
    }
    next()
}

module.exports.isReviewOwner = async (req, res, next) => {
    let review = await reviews.findById(req.params.reviewId)
    if (String(req.user._id) !== String(review.author.id)) {
        req.flash("error", "you are not the review owner")
        res.redirect("/hotels/" + req.params._id + "/reviews/" + req.params.reviewId)
    }
    next()
}

module.exports.isAdmin = async (req, res, next) => {
    if(req.user.username!=="Admin"){
        req.flash("error", "Only the admin can do that")
        res.redirect("/hotels")
    }
    next()
}
const express = require("express")
const router = express.Router()
const user = require("../models/user")
const reservation = require("../models/reservation")
const catchAsync = require("../utils/catchAsync")
const passport = require("passport")
const middleware = require("../middleWare")

router.get("/", (req, res) => {
    res.redirect("/hotels")
})

router.get("/login", (req, res) => {
    res.render("login")
})


router.get("/signup", (req, res) => {
    res.render("signup")
})

router.post("/signup",catchAsync(async (req, res) => {
    let exist = await user.findOne({username:req.body.username})
    if(!exist){
        let newUser = new user({
            username: req.body.username,
            fullName: req.body.fullName,
            password: "",
            email: req.body.email,
            gender: req.body.gender
        })
        let registeredUser = await user.register(newUser, req.body.password)
        registeredUser.save()
        req.login(registeredUser,()=>{
            console.log("signed up")
        })
        req.flash("success", "successfully signed up")
        res.redirect("/hotels")
    }
    else{
        req.flash("error","A user with that username already exists")
        res.redirect("/signup")
    }
}));

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), catchAsync(async (req, res) => {
    req.flash("success", "succesfully logged in")
    res.redirect("/hotels")
}));

router.get("/logout", (req, res) => {
    req.logout()
    req.flash("error", "logged out")
    res.redirect("/hotels")
})

router.get("/profile",middleware.isLoggedIn,catchAsync(async (req,res)=>{
    let reservations = await reservation.find({PersonId:req.user._id}).populate("HotelId")
    res.render("profile",{reservations,reservations})
}))

router.put("/profile",middleware.isLoggedIn,catchAsync(async (req,res)=>{
    let exist = await user.find({username:req.body.username})
    let exists = exist.username===req.user.username
    if(!exists){
        let updatedUser = {
            username: req.body.username,
            fullName: req.body.fullName,
            password: "",
            email: req.body.email,
            gender: req.body.gender
        }
        let User = await user.findByIdAndUpdate(req.user._id,updatedUser)
        user.register(User,req.body.password)
        req.login(User,()=>{
            console.log("signed up")
        })
        res.redirect("/profile")
    }
    else{
        req.flash("error","username already exists")
        res.redirect("/profile")
    }
}))

module.exports = router
const express = require("express")
const app = express()
const indexRoutes = require("./routes/index")
const hotelRoutes = require("./routes/Hotels")
const reviewRoutes = require("./routes/reviews")
const reservationRoutes = require("./routes/reservation")
const searchRoutes = require("./routes/search")
const bodyParser = require("body-parser")
const session = require("express-session")
const mongoose = require("mongoose")
const passport = require("passport")
const passportLocal = require("passport-local")
const flash = require("connect-flash")
const methodOverride = require("method-override")
const user = require("./models/user")
const SeedDB = require("./seeds")

// SeedDB();

app.use(methodOverride("_method"));
app.use(session({
    name: 'session',
    secret: "thisIsASecret_1245698",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use((req, res, next) => {
    res.locals.currentUser = req.user ? req.user : false;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.isAdmin = req.user ? req.user.username === "Admin" : false
    next();
})
app.use("/hotels", hotelRoutes)
app.use("/hotels/:id/reviews", reviewRoutes)
app.use("/hotels/:id/", reservationRoutes)
app.use(indexRoutes)
app.use(searchRoutes)

passport.use(new passportLocal(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

mongoose.connect("mongodb://localhost/HotelReservation",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
        console.log("Connected to database")
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log("Server started in port 3000!")
});

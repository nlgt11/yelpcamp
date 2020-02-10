const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        Campground      = require("./models/camground"),
        Comment         = require("./models/comment"),
        seedDB          = require("./seeds"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        User            = require("./models/user");

var     commentRoutes       = require("./routes/comments"),
        campgroundRoutes    = require("./routes/campgrounds"),
        indexRoutes         = require("./routes/index"); 

seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "My very very Secret key 81237jsadhd",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true} );
mongoose.set('useUnifiedTopology', true);

// MIDDLE WARES
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//ROUTING
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000!!!");
});
var express = require("express");
var router = express.Router();
var Campground = require("../models/camground");

router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (!err) {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        } else {
            console.log(err);
        }
    });
});

// Post new campground
router.post("/", isLoggedIn, (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = req.user;
    var newCampground = {name: name, image: image, description: description, author: author};

    Campground.create(newCampground, (err, newlyAdded) => {
        if (!err) {
            res.redirect("/campgrounds");
        } 
        else {
            console.log(err);
        }

    });
});
// Get create campground form
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (!err) {
            res.render("campgrounds/show", {campground: foundCampground});
        } 
        else {
            console.log(err);
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
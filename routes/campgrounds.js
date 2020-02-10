var express = require("express");
var router = express.Router();
var Campground = require("../models/camground");
var middleware = require("../middleware");


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
router.post("/", middleware.isLoggedIn, (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        username: req.user.username,
        id: req.user._id
    }
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
router.get("/new", middleware.isLoggedIn, (req, res) => {
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


//EDIT a camp
// Get edit form
router.get("/:id/edit", middleware.checkCampgroundOwnerShip, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (!err) {
            res.render("campgrounds/edit", {campground: foundCampground});
        } else {
            console.log(err);
        }
    });
});

router.put("/:id", middleware.checkCampgroundOwnerShip, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, foundCampground) => {
        if (!err) {
            res.redirect("/campgrounds/" + foundCampground._id);
        } else {
            console.log(err);
        }
    });
});


//DESTROY route
router.delete("/:id", middleware.checkCampgroundOwnerShip, (req,res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        res.redirect("/campgrounds");
    });
});

module.exports = router;
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


router.post("/", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};

    Campground.create(newCampground, (err, newlyAdded) => {
        if (!err) {
            res.redirect("/campgrounds");
        } 
        else {
            console.log(err);
        }

    });
});

router.get("/new", (req, res) => {
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

module.exports = router;
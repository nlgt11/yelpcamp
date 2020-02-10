var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/camground");
var Comment = require("../models/comment");


// Get form to create comment
router.get("/new", isLoggedIn,(req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (!err) {
            res.render("comments/new", {campground: foundCampground});
        } else {
            console.log(err);
        }
    });
});

// Post form
router.post("/", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (!err) {
            console.log(req.body.comment);
            Comment.create(req.body.comment, (err, newComment) => {
                if (!err) {
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + req.params.id);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
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
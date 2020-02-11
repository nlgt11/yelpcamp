var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/camground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// Get form to create comment
router.get("/new", middleware.isLoggedIn,(req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (!err) {
            res.render("comments/new", {campground: foundCampground});
        } else {
            console.log(err);
        }
    });
});

// Post form new comment
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (!err) {
            Comment.create(req.body.comment, (err, newComment) => {
                if (!err) {
                    newComment.author.username = req.user.username;
                    newComment.author.id = req.user._id;
                    newComment.save();
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + req.params.id);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
            req.flash("Error", "Something went wrong, please try again later!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Edit comment
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnerShip, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (!err) {
            res.render("comments/edit", {campground_id: req.params.id ,comment: foundComment});
        } else {
            console.log(err);
            req.flash("Error", "Something went wrong, please try again later!");
            res.redirect("back");
        }
    });
});

router.put("/:comment_id", middleware.isLoggedIn, middleware.checkCommentOwnerShip, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
        if (!err) {
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            console.log(err);
            req.flash("Error", "Something went wrong, please try again later!");
            res.redirect("back");
        }
    });
});



router.delete("/:comment_id", middleware.isLoggedIn, middleware.checkCommentOwnerShip, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (!err) {
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            console.log(err);
            req.flash("Error", "Something went wrong, please try again later!");
            res.redirect("back");
        }
    });
});

module.exports = router;
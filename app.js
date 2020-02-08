var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/camground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
mongoose.set('useUnifiedTopology', true);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.render("landing")
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (!err) {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        } else {
            console.log(err);
        }
    });
});


app.post("/campgrounds", (req, res) => {
    //get data -> add to arr -> redirect
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
    //redirect
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (!err) {
            res.render("campgrounds/show", {campground: foundCampground});
        } 
        else {
            console.log(err);
        }
    });
});

//===============================
//  COMMENTS ROUTES
//===============================

app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (!err) {
            res.render("comments/new", {campground: foundCampground});
        } else {
            console.log(err);
        }
    });
});
app.post("/campgrounds/:id/comments", (req, res) => {
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

app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000!!!");
});
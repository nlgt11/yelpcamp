var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
mongoose.set('useUnifiedTopology', true);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Salmon Creek", 
//         image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//         description: "The camp that has name of fish, smell badlyyyyy"
//     },
//     (err, newCampground) => {
//         if (!err) {
//             console.log('Successfully created: ');
//             console.log(newCampground);   
//         }
//         else
//             console.log(err);
//     }  
// );


// var campgrounds = [
//     {name: "Salmon Creek", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744175277fdd934bc3_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Mountain Mama", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Mountain Mama", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Mountain Mama takes me home, country road", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Mountain Mama", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Mountain Mama", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Mountain Mama", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
//     {name: "Mountain Mama", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"}
// ];

app.get("/", (req, res) => {
    res.render("landing")
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (!err) {
            res.render("index", {campgrounds: allCampgrounds});
        } else {
            console.log(err);
        }
    });
});


app.post("/campgrounds", (req, res) => {
    //get data -> add to arr -> redirect
    var name = req.body.name;
    var image = req.body.image;

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
    res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (!err) {
            res.render("show", {campground: foundCampground});
        } 
        else {
            console.log(err);
        }
    });
});

app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000!!!");
});
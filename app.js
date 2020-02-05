var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing")
});

app.get("/campgrounds", (req, res) => {
    var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744175277fdd934bc3_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"},
        {name: "Mountain Mama", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2f73d09e49c35e_340.jpg"}
    ];
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000!!!");
});
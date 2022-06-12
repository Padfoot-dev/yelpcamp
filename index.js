const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
var methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

mongoose.connect("mongodb+srv://abish18:DyBLWt3kdi37NR9I@cluster0.ahjnsad.mongodb.net/?retryWrites=true&w=majority").then(()=> {

    console.log("Connection is UP !!")
}).catch((e)=> {

    console.log("Error !!!");
    console.log(e);
})

const PORT = 3000;
const app =express();


app.set("view engine","ejs");
app.set("views",path.join(__dirname , "views"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);




app.get("/" , (req,res)=> {

    res.render("index")
})


app.get("/campgrounds" , async (req,res)=> {
    const campgrounds = await Campground.find({});

    res.render("campgrounds/campgrounds" , {campgrounds});
})

app.post("/campgrounds" , async (req,res)=> {
    console.log(req.body);
    const camp = new Campground(req.body.campgrounds);
    await camp.save();
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new" , (req,res)=> {

    res.render("campgrounds/new");
})

app.get("/campgrounds/:id" , async (req,res)=> {

    const {id} = req.params;
    const camp = await Campground.findById(id);

    res.render("campgrounds/show" , {camp})
})

app.get("/campgrounds/:id/edit" , async (req,res) => {
    const {id} = req.params;
    const camp = await Campground.findById(id);
    res.render("campgrounds/edit", {camp});
})


app.put("/campgrounds/:id" , async (req,res)=> {

    const {id} = req.params;

    const camp = await Campground.findByIdAndUpdate(id,{...req.body.campgrounds});
    res.redirect(`/campgrounds/${id}`)


})


app.delete("/campgrounds/:id", async (req,res)=> {

    const {id} = req.params;
    console.log(id);
    const camp = await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds")
})

app.listen(process.env.PORT || PORT , ()=> {                        

    console.log(`App listening on port`)
})
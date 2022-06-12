const mongoose = require("mongoose");
// DyBLWt3kdi37NR9I
const Campground = require("../models/campgrounds");
const {descriptors , places} = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb+srv://abish18:DyBLWt3kdi37NR9I@cluster0.ahjnsad.mongodb.net/?retryWrites=true&w=majority").then(()=> {

    console.log("Connection is UP !!")
}).catch((e)=> {

    console.log("Error !!!");
    console.log(e);
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async ()=> {

        await Campground.deleteMany({});
        for(let i = 0;i<50;i++) {

            const random1000 =  Math.floor(Math.random() * 1000);
            const price =  Math.floor(Math.random() * 20) +10;
            const c = new Campground(
                {
                    title : `${sample(descriptors)} , ${sample(places)}`,
                    location : `${cities[random1000].city} , ${cities[random1000].state}`,
                    image : "https://source.unsplash.com/collection/483251",
                    description : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque blanditiis quisquam tempore ratione eveniet aliquid cum vel. Natus rem autem vero expedita soluta laudantium, ab eligendi eius corporis repudiandae perferendis?",
                    price : price


                }
            )
            await c.save();
        }
    
}


seedDB().then( ()=> {
    mongoose.connection.close();
})
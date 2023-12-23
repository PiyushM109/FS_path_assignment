const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

main().then(()=>{console.log("Connection successfull")})
.catch(err =>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017//Whatsapp');
}

app.get("/",(req,res)=>{
    res.send("Working");
});

app.listen(3000,()=>{
    console.log(`Server is running on port : 3000`);
});
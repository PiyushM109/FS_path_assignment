const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const path = require("path");
const Chat = require("./models/chat.js");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

main().then(() => { console.log("Connection successfull") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
};

//index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/create", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    });
    newChat.save().then(res => { console.log("Chat saved") }).catch(err => { console.log(err) });
    res.redirect("/chats");

});

app.get("/chats/:id/edit",(req,res) => {
    let {id} = req.params;
    Chat.findById(id).then(data => {
        res.render("edit.ejs",{data})
    }).catch(err => {
        res.status(404).send("there is aome problem please try again")
    });
});

app.put("/chats/:id",(req,res)=>{
    let {id} = req.params;
    let {newmsg} = req.body.msg;
    Chat.findByIdAndUpdate(id,{msg:newmsg}).then(data=>{
        res.redirect("/chats");
    }).catch(err => {
        res.send("Something went wrong");
    });
});

app.get("/chats/:id/delete",(req,res)=>{
    let {id} = req.params;
    Chat.findByIdAndDelete(id).then(data=>{
        res.redirect("/chats");
    }).catch(err => {
        res.send("Something went wrong");
    });
});

app.get("/", (req, res) => {
    res.send("Working");
});

app.listen(3000, () => {
    console.log(`Server is running on port : 3000`);
});
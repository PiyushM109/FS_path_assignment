const mongoose = require("mongoose");
const Chat = require("./models/chat.js");



main().then(() => { console.log("Connection successfull") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
};

let allChat = [
    {
        from: "Piyush",
        to: "krishna",
        msg: "send me your exam sheets",
        created_at: new Date()
    },
    {
        from: "krishna",
        to: "Piyush",
        msg: "ok, wait for a minute",
        created_at: new Date()
    },
    {
        from: "Avi",
        to: "Rk",
        msg: "did you know where are they now?",
        created_at: new Date()
    },
    {
        from: "Rk",
        to: "Avi",
        msg: "No, I don't know anything about it",
        created_at: new Date()
    }
];

Chat.insertMany(allChat);

// Chat1.save().then(res => console.log(res));
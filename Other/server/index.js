const express = require('express')
const app = express()
const path = require("Path")
const session = require("express-session")
const flash = require("connect-flash");


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
const sessionOptions = { secret: "supersecretestring", resave: false, saveUninitialized: true }


app.use(session(sessionOptions));
app.use(flash())




app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if (name === "anonymous") {
        req.flash("error", "user not found!");

    } else {
        req.flash("success", "user registration successfull");
    }
    res.redirect("/hello");
})

app.get("/hello", (req, res) => {
    res.locals.Succmessages = req.flash("success")
    res.locals.Errmessages = req.flash("error")
    res.render("page.ejs", { name: req.session.name });
})

app.get("/test", (req, res) => {

    res.send("server running");
});

// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1
//     }

//     res.send(`you sent a request ${req.session.count} times`)
// })


app.listen(3000, () => {
    console.log("App is running on port no: 3000",)
});

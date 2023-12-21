const express = require("express");
const app = express();
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const path = require("path");
const methodOvrride = require("method-override");

let port = 3000;

app.use(methodOvrride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine",'ejs');
app.set("views",path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'prans_app',
    password: ''
});


let getUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}

app.get("/", (req, res) => {
    let q = "SELECT count(*) FROM user";
    
    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else {
            let total = result[0]["count(*)"];
            res.render("home.ejs", { total });
        }
    });
});


app.get("/user",(req,res)=>{
    let q = "SELECT * FROM user";
    connection.query(q, (err, users) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else { 
            // console.log(result);
            res.render("user.ejs",{users});
        }
    });
});
app.get("/user/:id/edit", (req, res) => {
    let id = req.params.id;
    let q = "SELECT * FROM user WHERE id = ?";
    connection.query(q, [id], (err, user) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else { 
            console.log(user);
            res.render("edit.ejs",{user});
        }
    });
});

app.patch("/user/:id",(req,res)=>{
    let id = req.params.id;
    let {password : formpass , username : newname} = req.body;
    let q = "SELECT * FROM user WHERE id = ?";
    connection.query(q, [id], (err, user) => {
        if (err) {
            console.log(err);
            res.send("Something went wrong");
        } else { 
            if(formpass != user[0].password){
                res.send("Wrong Password");
            }
            else{
                let q2 = `UPDATE user SET username = '${newname}' WHERE id = '${id}'`;
                connection.query(q2,(err,data)=>{
                    if(err) throw err;
                    res.redirect("/user");
                })
            }

            // res.render("edit.ejs",{user});
        }
    });
})



app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})



// let data = [];
// for (let i = 1; i <= 100; i++) {
//     data.push(getUser());
// }

// let q = "INSERT INTO user (id,username,email,password) VALUES ?";



// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// }
// catch (err) {
//     console.log(err);
// }
// connection.end();


// console.log(getUser());
// let users = [["123b", "123_usernameb", "email@gmail.comb", "abc@123b"], ["123c", "123_usernamec", "email@gmail.comc", "abc@123c"]];
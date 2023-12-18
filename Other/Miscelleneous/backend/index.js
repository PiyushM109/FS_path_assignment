const express = require('express');

const app = express();

let port = 3000;
app.use(express.urlencoded({extended:true}));

app.get("/register",(req,res)=>{
    let {user,pass} = req.query;
    console.log(user," ",pass);
    res.send("Standard get response");
})
app.post("/register",(req,res)=>{
    console.log(req.body);
    res.send("Standard post response");
})

app.listen(port, ()=>{
    console.log('App running on port no ',port);
})
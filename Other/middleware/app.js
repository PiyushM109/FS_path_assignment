const express = require('express')
const app = express()


const port = 3000;

// app.use((req,res,next)=>{
//     console.log("middleware for each path");
//     next();
// })

// app.use("/cost",(req,res,next)=>{
//     console.log("cost path middleware");
//     next();
// });

// app.use((req,res,next)=>{
//     req.time = Date.now();
//     console.log(req.method,req.hostname,req.path);
//     next();
// });

app.use("/api",(req,res,next)=>{
    let {token} = req.query;
    if(token==="giveaccess"){
        next();
    }
    res.send("ACCESS DENIED!");
})

app.get("/api",(req,res)=>{
    res.send("data");
})



app.get("/cost",(req,res)=>{
    res.send("server running");
});


app.listen(port,()=>{
    console.log("App is running on port no: ",port)
});

const express = require('express')
const app = express();
const ExpressError = require("./express_error.js")


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

app.use("/cost",(err,req,res,next)=>{
    console.log(err);
    next();
})

app.get("/api",(req,res)=>{
    res.send("data");
});

app.emit("/admin",(req,res)=>{
    throw new ExpressError(403,"Access to this content is forbidden")
});



app.get("/cost",(req,res)=>{
    res.send("server running");
});


app.listen(port,()=>{
    console.log("App is running on port no: ",port)
});

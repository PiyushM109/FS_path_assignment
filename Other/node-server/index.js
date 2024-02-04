const http = require('http');
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
    const log = `${Date.now()}:New req received\n`;
    fs.appendFile("log.txt",log,(err,data)=>{
        res.end("Hello from Server");
    })
    
});

myServer.listen(8000,()=>{
    console.log("Server Started");
})
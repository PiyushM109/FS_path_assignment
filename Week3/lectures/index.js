const fs = require("fs");

fs.readFile("a.txt","utf-8",(err,data)=>{
    if(err) throw new Error(err);
    else{
        console.log(data);
    }
})
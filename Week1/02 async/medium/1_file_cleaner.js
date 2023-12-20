const fs = require("fs");

fs.readFile("one.txt","utf-8",(err, data) => {
    if (err) {
        console.error("Something went wrong");
        return;
    }
    var str = data.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();
    fs.writeFile('one.txt',str,(err)=>{
        if(err){
            console.log("Something went wrong");
            return;
        }
        console.log("Data is successfully written in file first.txt");
    })
});



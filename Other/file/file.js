const fs = require("fs");
const os = require("os");

// fs.writeFileSync('./text.txt',"Hey Hello File world")

// let cont = fs.readFileSync("./contact.txt","utf-8")
// console.log(cont);

// fs.readFile("./contact.txt","utf-8",(err,res)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(res);
//     }
// })

console.log(os.cpus().length)
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// function middleware1(req,res,next){
//     console.log("from inside middlewear "+req.headers.counter);
//     next();
// }

// app.use(middleware1);

function handleFirstrequest(req, res) {
    var counter = req.body.counter;

    
        var calculatedSum = Calculatesum(counter);
        var ansObject ={
            sum : `the sum of 1 to 100 is ${calculatedSum}`
        } 
        res.send(ansObject);
    
}
// app.get('/handleSum', handleFirstrequest);
app.post('/handleSum', handleFirstrequest);

function started() {
    console.log(`Example app listening on port ${port}`);
}
app.listen(port, started);


function Calculatesum(counter) {
    let sum = 0;
    for (let i = 0; i <= counter; i++) {
        sum = sum + i;
    }
    return sum;
}


// console.log(calculatedSum);
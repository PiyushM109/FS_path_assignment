const express = require('express')
const fs = require('fs');

const app = express()


const port = 3000;
const newData = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
  };
  jsonContent = ;

  const filePath = 'test.json';
  
  // Write to the file
  fs.writeFile(filePath, jsonContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('Data has been written to', filePath);
  });


app.get("/",(req,res)=>{
    res.send("server running");
});


app.listen(port,()=>{
    console.log("App is running on port no: ",port)
});

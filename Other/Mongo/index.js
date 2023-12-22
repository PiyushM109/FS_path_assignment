const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/test");

main()
    .then(() => {
        console.log("Connection successfull")
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);
const EMployee = mongoose.model("Employee", new mongoose.Schema({
    eid: Number,
    name: String,
    Salary: Number,
    Department: String
}));

// User.insertMany([
//     {name:"Virat",email:"vk18@gmail.com",age:35},
//     {name:"Rohit",email:"ro45@gmail.com",age:37},
//     {name:"MS",email:"Thala7@gmail.com",age:41},
// ]).then((res)=>{
//     console.log(res);
// });
// const user1 = new User({ name: "Adam", email: "adam@yahoo.in", age: 48 });
// user1.save();

// User.find({age:{$gt:40}}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

// User.updateOne({name : "Adam"},{name:"Sachin",email:"god10@gmail.com"}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(res);
// });

// User.deleteOne({name:"Sachin"}).then((res)=>{
//     console.log(res);
// });

User.find({}).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

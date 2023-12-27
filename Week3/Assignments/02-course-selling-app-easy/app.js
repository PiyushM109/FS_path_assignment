const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let admin = [
    { username: 'admin', password: 'pass'},
    { username: 'piyush', password: 'pass'},
];
let course = [
    {
        id: 1,
        title: 'cohort2',
        description: 'course description',
        price: 'course price',
        imagelink: 'image link',
        published: 'true'
    },
    {
        id: 2,
        title: 'cohort1',
        description: 'description',
        price: 'price',
        imagelink: 'image link',
        published: 'true'
    },
    {
        id: 3,
        title: 'Delta',
        description: 'web development',
        price: '4000',
        imagelink: 'link',
        published: 'true'
    },
    {
        id: 4,
        title: 'cohort 1to100',
        description: 'web development',
        price: '4000',
        imagelink: 'link',
        published: 'true'
    }
];
let user = [
    { username: 'piyush', password: 'pass' ,  courses : []},
    { username: 'user1', password: 'pass',  courses : [] },
    { username: 'user2', password: 'pass',  courses : [] }
]

app.post("/admin/signup", (req, res) => {
    let { username, password } = req.body;
    let isPresent = admin.some(admin => admin.username === username);
    if (isPresent) {
        res.send("You already have an account");
    } else {
        let newobj = {
            username: username,
            password: password,
            courses : [],
        }
        admin.push(newobj);
        console.log(admin);
        res.send("Admin created successfully")
    }
});

app.post("/admin/login", (req, res) => {
    let { username, password } = req.headers;
    let isPresent = admin.some(admin => admin.username === username && admin.password === password);
    if (isPresent) {
        res.send('Logged in successfully');
    } else {
        res.send("username or password not found");
    }
});

app.post("/admin/courses", (req, res) => {
    let { username, password } = req.headers;
    let isPresent = admin.some(admin => admin.username === username && admin.password === password);
    if (isPresent) {
        let { title, description, price, imagelink, published } = req.body;
        let id = course.length + 1;
        let newobj = {
            id: id,
            title: title,
            description: description,
            price: price,
            imagelink: imagelink,
            published: published,
        }
        course.push(newobj);
        console.log(course);
        res.send(`Course created successfully, CourseId: ${id}`);
    }
    else {
        res.send("Please login first");
    }
});

app.put("/admin/courses/:id", (req, res) => {
    let { username, password } = req.headers;
    let id = req.params.id;
    let isPresent = admin.some(admin => admin.username === username && admin.password === password);
    if (isPresent) {
        let index = id - 1;
        console.group(index);
        let { title, description, price, imagelink, published } = req.body;
        course[index].title = title;
        course[index].description = description;
        course[index].price = price;
        course[index].imagelink = imagelink;
        course[index].published = published;
        console.log(course[index]);
        res.send(course[index]);
    }
    else {
        res.send("Please login first");
    }
});

app.get("/admin/course", (req, res) => {
    let { username, password } = req.headers;
    let id = req.params.id;
    let isPresent = admin.some(admin => admin.username === username && admin.password === password);
    if (isPresent) {
        res.send(course);
    }
    else {
        res.send("Please login first");
    }
});

app.get("/", (req, res) => {
    res.send("App is working");
});

app.post("/users/signup", (req, res) => {
    let { username, password } = req.body;
    let isPresent = user.some(user => user.username === username);
    if (isPresent) {
        res.send("You already have an account");
    } else {
        let newobj = {
            username: username,
            password: password
        }
        user.push(newobj);
        console.log(user);
        res.send("User created successfully")
    }
});
app.post("/users/login", (req, res) => {
    let { username, password } = req.headers;
    let isPresent = user.some(user => user.username === username && user.password==password);
    if (isPresent) {
        res.send("Logged in successfully");
    } else {
        res.send("invalid credentials")
    }
});

app.get("/users/courses",(req,res)=>{
    let { username, password } = req.headers;
    let isPresent = user.some(user => user.username === username && user.password==password);
    if (isPresent) {
        res.send(course);
    } else {
        res.send("invalid credentials")
    }
});

app.post("/users/courses/:CourseId",(req,res)=>{
    let { username, password } = req.headers;
    let id = req.params.CourseId;
    let isPresent = user.some(user => user.username === username && user.password==password);
    if (isPresent) {
        let foundUser = user.find(user => user.username === username && user.password === password);
        // console.log(foundUser);
        foundUser['courses'].push(course[id-1]);
        res.send('Course purchased successfully');
    } else {
        res.send("invalid credentials")
    }
});

app.get("/users/purchasedCourses",(req,res)=>{
    let { username, password } = req.headers;
    let isPresent = user.some(user => user.username === username && user.password==password);
    if (isPresent) {
        let foundUser = user.find(user => user.username === username && user.password === password);
        let courses = foundUser.courses;
        // console.log(courses);
        res.send(courses);
    } else {
        res.send("invalid credentials")
    }
});



app.listen(3000, () => {
    console.log("App is running at port 3000");
});
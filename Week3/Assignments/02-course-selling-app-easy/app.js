const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let admin = [];
let course = [];
let user = []

const adminauthenticator = (req, res, next) => {
    let { username, password } = req.body;
    let isAdmin = admin.find(admin => admin.username === username && admin.password == password);
    if (isAdmin) {
        next();
    } else {
        res.send(401).json({ message: "invalid credentials" });
    }
}

const userauthenticator = (req, res, next) => {
    const { username, password } = req.headers
    const isUser = user.find(user => user.username === username && user.password === password)
    if (isUser) {
        next()
    } else {
        res.status(401).json({ message: 'Invalid credentials' })
    }
}

app.post("/admin/signup", (req, res) => {
    let { username, password } = req.body;
    let isPresent = admin.some(admin => admin.username === username);
    if (isPresent) {
        res.status(403).json({ message: 'Admin already exists' })
    } else {
        let newobj = {
            username: username,
            password: password,
            courses: [],
        }
        admin.push(newobj);
        console.log(admin);
        res.json({ message: 'Admin created successfully' })
    }
});

app.post("/admin/login", adminauthenticator, (req, res) => {
    res.json({ message: 'Logged in successfully' })
});

app.post("/admin/courses", adminauthenticator, (req, res) => {
    let { title, description, price, imagelink, published } = req.body;
    let isPresent = course.find(c => c.name === title);
    if (isPresent) {
        res.status(403).json({ message: 'Course already exists' })
    }
    else {
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

});

app.put("/admin/courses/:id", adminauthenticator, (req, res) => {
    let id = req.params.id;
    const isPresent = course.find(c => c.id === id)
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
    } else {
        res.status(404).json({ message: 'Course not found' })
    }

});

app.get("/admin/course", adminauthenticator, (req, res) => {
    res.json({ courses: course });
});

app.get("/", (req, res) => {
    res.send("App is working");
});

app.post("/users/signup", (req, res) => {
    let { username, password } = req.body;
    let isPresent = user.some(user => user.username === username);
    if (isPresent) {
        res.status(403).json({ message: 'User already exists' })
    } else {
        let newobj = {
            username: username,
            password: password
        }
        user.push(newobj);
        console.log(user);
        res.json({ message: 'User created successfully' })
    }
});
app.post("/users/login", userauthenticator, (req, res) => {
    res.json({ message: 'Logged in successfully' })
});

app.get("/users/courses", userauthenticator, (req, res) => {
    res.json({ courses: course.filter(c => c.published) })
});

app.post("/users/courses/:CourseId", userauthenticator, (req, res) => {
    let { username, password } = req.headers;
    let id = req.params.CourseId;
    const iscourse = course.find(c => c.id === id && c.published)
    if (iscourse) {
        let foundUser = user.find(user => user.username === username && user.password === password);
        // console.log(foundUser);
        foundUser['courses'].push(course[id - 1]);
        res.json({ message: 'Course purchased successfully' })
    } else {
        res.status(404).json({ message: 'Course not found' })
    }
});

app.get("/users/purchasedCourses", userauthenticator, (req, res) => {
    let { username, password } = req.headers;
    let foundUser = user.find(user => user.username === username && user.password === password);
    let courses = foundUser.courses;
    res.send(courses);

});

app.listen(3000, () => {
    console.log("App is running at port 3000");
});
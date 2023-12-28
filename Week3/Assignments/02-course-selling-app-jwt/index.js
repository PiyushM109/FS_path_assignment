const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")

app.use(express.json());

const secretKey = "Virat_kohli"
const port = 3000;

let courses = [];
let admins = [];
let users = [];


const generateJwt = (user, secret) => {
    const payload = { username: user.username }
    return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.status(403).json({ message: 'Forbidden' })
            } else {
                req.user = user
                next()
            }
        })
    }
}

app.post('/admin/signup', (req, res) => {
    const { username, password } = req.body
    const adminAlreadyExist = admins.find(admin => admin.username === username)
    if (adminAlreadyExist) {
        res.status(403).json({ message: 'Admin already exists' })
    } else {
        const admin = { username: username, password: password }
        admins.push(admin)
        const token = generateJwt(admin)
        res.json({ message: 'Admin created successfully', token: token })
    }
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.headers
    const admin = admins.find(admin => admin.username === username && admin.password === password)
    if (admin) {
        const token = generateJwt(admin)
        res.json({ message: 'Logged in successfully', token: token })
    } else {
        res.status(403).json({ message: "Invalid credentials" })
    }
});


app.post("/admin/courses",authenticateJwt,(req,res)=>{
    let course = req.body;
    course.id = courses.length+1;
    let isPresent = courses.some(c => c.title==course.title);
    if(isPresent){
        res.json({ message: "Course already available" });
    }else{
        courses.push(course);
        res.json({ message: 'Course created successfully', courseId: course.id })
    }
})

app.put("/admin/courses/:courseId",authenticateJwt,(req,res)=>{
    let id = req.params.courseId;
    let updated = req.body;
    updated.id = Number(id);
    courses[id-1] = updated;
    res.json({ message: 'Course updated successfully' });
})

app.get("/admin/courses",authenticateJwt,(req,res)=>{
    res.send(courses);
})







app.get("/", (req, res) => {
    res.send("server running")
});


app.listen(port, () => {
    console.log("App is running on port no: ", port)
});

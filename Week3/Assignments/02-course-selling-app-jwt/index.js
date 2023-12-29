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
                req.user = user;
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


app.post("/admin/courses", authenticateJwt, (req, res) => {
    let course = req.body;
    course.id = courses.length + 1;
    let isPresent = courses.some(c => c.title == course.title);
    if (isPresent) {
        res.json({ message: "Course already available" });
    } else {
        courses.push(course);
        res.json({ message: 'Course created successfully', courseId: course.id })
    }
})

app.put("/admin/courses/:courseId", authenticateJwt, (req, res) => {
    let id = req.params.courseId;
    let updated = req.body;
    updated.id = Number(id);
    courses[id - 1] = updated;
    res.json({ message: 'Course updated successfully' });
})

app.get("/admin/courses", authenticateJwt, (req, res) => {
    res.send(courses);
})

//User routes

app.post("/users/signup", (req, res) => {
    const { username, password } = req.body
    const userAlreadyExist = users.find(user => user.username === username)
    if (userAlreadyExist) {
        res.status(403).json({ message: 'user already exists' })
    } else {
        const user = { username: username, password: password, courses: [] }
        users.push(user)
        const token = generateJwt(user)
        res.json({ message: 'user created successfully', token: token })
    }
})

app.post("/users/login", (req, res) => {
    const { username, password } = req.headers;
    const user = users.find(user => user.username === username && user.password === password)
    if (user) {
        const token = generateJwt(user)
        res.json({ message: 'Logged in successfully', token: token })
    } else {
        res.status(403).json({ message: "Invalid credentials" })
    }

})

app.get("/users/courses", authenticateJwt, (req, res) => {
    res.json({ courses: courses.filter(c => c.published) });
});

app.post("/users/courses/:courseId", authenticateJwt, (req, res) => {
    const username = req.user.username
    const id = parseInt(req.params.courseId)
    const course = courses.find(c => c.id === id && c.published)
    if (course) {
        const user = users.find(u => u.username === username)
        user.courses.push(id)
        res.json({ message: 'Course purchased successfully' })
    } else {
        res.status(404).json({ message: 'Course not found' })
    }
})

app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
    const username = req.user.username
    const user = users.find(u => u.username === username)
    const purchasedCourses = courses.filter(c => user.courses.includes(c.id))
    res.json({purchasedCourses: purchasedCourses})
  });





app.get("/", (req, res) => {
    res.send("server running")
});


app.listen(port, () => {
    console.log("App is running on port no: ", port)
});

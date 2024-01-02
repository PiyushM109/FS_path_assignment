const express = require('express')
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const { Schema } = mongoose;



const app = express()
app.use(express.json());

const secretKey = "S3CR37|<3Y";

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.status(403).json({ message: 'Forbidden' })
            }
            else {
                req.user = user;
                next();
            }
        })
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}



const port = 3000;

main().then(() => {
    console.log("Connected to DB")
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/course');
}

const courseSchema = new Schema({
    title: String,
    desc: String,
    price: Number,
    image: String,
    published: Boolean
});

const adminSchema = new Schema({
    username: String,
    password: String,
});

const userSchema = new Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})



const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const User = mongoose.model('User', userSchema);


//Admin Routes
app.post("/admin/signup", async (req, res) => {
    const { username, password } = req.body;
    const adminAlreadyExist = await Admin.findOne({ username });
    if (adminAlreadyExist) {
        res.status(403).json({ message: `admin already exist` });
    } else {
        const admin = new Admin({ username, password });
        await admin.save();
        const token = jwt.sign({ username, role: 'admin' }, secretKey, { expiresIn: '1h' });
        res.json({ message: "admin created successfully", token: token });
    }
});

app.post("/admin/login", authenticateJwt, async (req, res) => {
    let { username, password } = req.headers;
    const adminAlreadyExist = await Admin.findOne({ username, password });
    if (adminAlreadyExist) {
        const token = jwt.sign({ username, role: 'admin' }, secretKey, { expiresIn: '1h' });
        res.json({ message: "login successfully" });
    } else {
        res.status(403).json({ message: "Invalid credentials" })
    }
});

app.post("/admin/courses", authenticateJwt, async (req, res) => {
    const course = new Course(req.body)
    const courseAlreadyExist = await Course.findOne({ title: course.title });
    if (courseAlreadyExist) {
        res.status(403).json({ message: 'Course already exists' })
    } else {
        await course.save()
        res.json({ message: 'Course created successfully', courseId: course.id })
    }
});

app.put("/admin/courses/:courseId", authenticateJwt, async (req, res) => {
    let id = req.params.courseId;
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' })
    } else {
        res.status(404).json({ message: 'Course not found' })
    }
});

app.get("/admin/courses", authenticateJwt, async (req, res) => {
    const courses = await Course.find({})
    res.json({ courses: courses });
});

//USER ROUTES
app.post('/users/signup', async (req, res) => {
    const { username, password } = req.body
    const userAlreadyExist = await User.findOne({ username })
    if (userAlreadyExist) {
        res.status(403).json({ message: 'User already exists' })
    } else {
        const user = new User({ username, password })
        await user.save()
        const token = jwt.sign({ username, role: 'user' }, secretKey, { expiresIn: '1h' })
        res.json({ message: 'User created successfully', token: token })
    }
});

app.post('/users/login', async (req, res) => {
    const { username, password } = req.headers
    const user = await User.findOne({ username, password })
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, secretKey, { expiresIn: '1h' })
        res.json({ message: 'Logged in successfully', token: token })
    } else {
        res.status(403).json({ message: "Invalid credentials" })
    }
});

app.get('/users/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({ published: true })
    res.json({ courses: courses })
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
    const id = parseInt(req.params.courseId)
    const course = await Course.findById(id)
    if (course) {
        const username = req.user.username
        const user = await User.findone({ username: username })
        user.purchasedCourses.push(course)
        await user.save()
        res.json({ message: 'Course purchased successfully' })
    } else {
        res.status(404).json({ message: 'Course not found' })
    }
});

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
    const username = req.user.username
    const user = await User.findOne({ username: username }).populate('purchasedCourses')
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] })
    } else {
        res.status(404).json({ message: 'User not found' })
    }
});

app.get("/", (req, res) => {
    res.send("server running");
});


app.listen(port, () => {
    console.log("App is running on port no: ", port)
});

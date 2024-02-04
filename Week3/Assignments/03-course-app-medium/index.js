const express = require('express');
const jwt = require("jsonwebtoken")
const app = express();
const fs = require('fs').promises;
const cors = require('cors');

app.use(express.json());
app.use(cors());
const secretKey = "secret_key"


let ADMINS = [];
let USERS = [];
let COURSES = [];

async function initializeData() {
  try {
    ADMINS = JSON.parse(await fs.readFile('admins.json', 'utf8'));
    USERS = JSON.parse(await fs.readFile('users.json', 'utf8'));
    COURSES = JSON.parse(await fs.readFile('courses.json', 'utf8'));
    console.log("Data read successfully");
  } catch (error) {
    console.error('Error reading data:', error);
    ADMINS = [];
    USERS = [];
    COURSES = [];
  }
}

// Call the async function to initialize data
initializeData();

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

app.get("/admin/me",authenticateJwt,(req,res)=>{
  res.json({
    username : req.user.username
  })
})

// Admin routes
app.post('/admin/signup', async (req, res) => {
  const { username, password } = req.body
  if(username=="" || password=="" || username===undefined){
    res.status(403).json({message:"username and password required"});
    return;
  }
  const adminAlreadyExist = ADMINS.find(admin => admin.username === username && admin.password===password)
  if (adminAlreadyExist || username == "") {
    res.status(409).json({ message: 'Admin already exists' })
  } else {
    const admin = { username: username, password: password }
    ADMINS.push(admin);
    fs.writeFile('admins.json', JSON.stringify(ADMINS), (err) => {
      if (err) {
        console.error('Error writing admins.json:', err);
      } else {
        console.log('Admins data written to admins.json');

      }
    })
    console.log(ADMINS);
    const token = generateJwt(admin)
    res.json({ message: 'Admin created successfully', token: token });

  }
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username + " " + password);
  let admin = ADMINS.find(admin => admin.username == username && admin.password == password)
  console.log(admin);
  if (admin) {
    const token = generateJwt(admin)
    res.json({ message: 'Logged in successfully', token: token })
  } else {
    res.status(403).json({ message: "Invalid credentials" })
  }
});

app.post('/admin/courses', authenticateJwt, async(req, res) => {
  const course = req.body
  console.log(course);
  console.log(COURSES);
  const courseAlreadyExist = COURSES.find(c => c.name == course.title)
  console.log(courseAlreadyExist);
  if (courseAlreadyExist) {
    res.status(403).json({ message: 'Course already exists' })
  } else {
    course.id = COURSES.length + 1;
    COURSES.push(course)
    await fs.writeFile('courses.json', JSON.stringify(COURSES), 'utf8');
    res.json({ message: 'Course created successfully', course: course.id });
  }
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const { title, desc, price, image, published } = req.body
  const id = parseInt(req.params.courseId)
  
  const course = COURSES.find(c => c.id === id)
  if (course) {
    course.title = title
    course.desc = desc
    course.price = price
    course.image = image
    course.published = published
    await fs.writeFile('courses.json', JSON.stringify(COURSES), 'utf8');
  res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' })
  }
});

app.get('/admin/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES })
});

// User routes
app.post('/users/signup', (req, res) => {
  const { username, password } = req.body
  const userAlreadyExist = USERS.find(user => user.username == username)
  if (userAlreadyExist) {
    res.status(403).json({ message: 'User already exists' })
  } else {
    const user = { username: username, password: password, purchasedCourses: [] }
    USERS.push(user)
    fs.writeFileSync('users.json', JSON.stringify(USERS));
    const token = generateJwt(user)
    res.json({ message: 'User created successfully', token: token })
  }
});

app.post('/users/login', (req, res) => {
  const { username, password } = req.headers
  const user = USERS.find(user => user.username == username && user.password == password)
  if (user) {
    const token = generateJwt(user)
    res.json({ message: 'Logged in successfully', token: token })
  } else {
    res.status(403).json({ message: "Invalid credentials" })
  }
});

app.get('/users/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES.filter(c => c.published) })
});

app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  const username = req.user.username
  const id = parseInt(req.params.courseId)
  const course = COURSES.find(c => c.id == id && c.published)
  if (course) {
    const user = USERS.find(u => u.username == username)
    user.purchasedCourses.push(id)
    fs.writeFileSync('users.json', JSON.stringify(USERS));
    res.json({ message: 'Course purchased successfully' })
  } else {
    res.status(404).json({ message: 'Course not found' })
  }
});

app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
  const username = req.user.username
  const user = USERS.find(u => u.username == username)
  const purchasedCourses = COURSES.filter(c => user.purchasedCourses.includes(c.id))
  res.json({ purchasedCourses: purchasedCourses })
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

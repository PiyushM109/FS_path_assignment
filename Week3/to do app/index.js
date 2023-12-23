const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");
const path = require("path")

let todos

fs.readFile("todos.json", {encoding: "utf-8"}, (err, data) => {
  if (err) throw new Error(err)
  todos = JSON.parse(data)
})

function writeTodos(todos){
  const todosJSON = JSON.stringify(todos, null, 2)
  fs.writeFile('todos.json', todosJSON, (err) => {
      if (err) throw new Error(err)
      console.log('Todos successfully written to file.');
  });
}

app.use(bodyParser.json())

let id = 0

function createTODO(title, completed, description){
  let todo = {
    id: id,
    title: title,
    completed: completed,
    description: description
  }
  todos.push(todo)
  writeTodos(todos)
}

app.post('/todos', (req, res) => {
  let {title, completed, description} = req.body
  id += 1
  createTODO(title, completed, description)
  res.status(201).send({id: id, title:title, description: description})
})

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.get(`/todos/:id`, (req, res) => {
  const todoId = req.params.id
  if (!isNaN(todoId)){
    const todo = todos.find((todo) => todo.id === parseInt(todoId))
    if (todo){
      res.json(todo)
    } else{
      res.status(494).send("404 Not Found")
    }
  } else{
    res.status(404).send("404 Not Found")
  }
})


app.put('/todos/:id', (req, res) => {
  const {title, completed} = req.body
  const todoId = req.params.id
  if (!isNaN(todoId)){
    const foundTodo = todos.find((todo) => todo.id === parseInt(todoId));
    if (foundTodo) {
      foundTodo.title = title;
      foundTodo.completed = completed;
      writeTodos(todos)
      res.send();
    } else {
      res.status(404).send("404 Not Found");
    }
  } else{
    res.status(404).send("404 Not Found")
  }
})  


app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id
  if (!isNaN(todoId)){
    const foundTodoIndex = todos.findIndex((todo) => todo.id === parseInt(todoId));
    if (foundTodoIndex !== -1) {
      todos.splice(foundTodoIndex, 1)
      writeTodos(todos)
      res.send();
    } else {
      res.status(404).send("404 Not Found");
    }
  } else{
    res.status(404).send("404 Not Found")
  }
})  
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.use((req, res) => {
  res.status(404).send("404 Not Found")
})


app.listen(3000)
module.exports = app;

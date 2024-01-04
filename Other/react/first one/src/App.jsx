
import { useState } from 'react';
import './App.css'

function App() {
  const [todo, setTodo] = useState({
    title : "go to gym2",
    description : "go to gym 112",
    id : 1
  })

  setInterval(()=>{
    setTodo({
      title : "go to park",
      description : "go to hotel",
      id : 1
    })
  },2000)
  return (
    <div>
    <h1>Piyush More</h1>
    {todo.title}
    {todo.description}
    {todo.id}
    <PersonName firstName ={todo.title} lastName={"More"}></PersonName>
    </div>
  )
}

function PersonName(props){
  return <div>
    {props.firstName}{props.lastName}
  </div>
}

export default App

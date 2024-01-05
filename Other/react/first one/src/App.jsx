
import React, { useState } from 'react';
import './App.css'

function App() {
  const [todos, setTodos] = React.useState([{
    title: "go to gym1",
    description: "hit the gym 112",
    id: 1
  },
  {
    title: "go to gym2",
    description: "hit the gym ",
    id: 1
  }]);

  React.useEffect(() => {

    fetch("http://localhost:3000/todos", { method: "GET" }).then((response) => {
      response.json().then((data) => {
        setTodos(data);
        console.log(data);
      })
    });
  }, [])

  return (
    <div>
      {todos.map((todo) => {
        return <div>
          {todo.title}
          {todo.description}
          <button>Delete</button>
          <br />
          </div>
      })}
    </div>
  )
}

function Todo(props) {
  return <div>
    {props.title}
    {props.description}

    {/* <button onClick={()=>{

    }}>Hii there</button> */}
  </div>
}
export default App

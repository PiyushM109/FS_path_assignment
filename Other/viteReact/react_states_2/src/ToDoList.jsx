import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ToDOList() {
  let [todos, setTodos] = useState([]);
  let [newTodo, setNewToDo] = useState("");
  let addNewTask = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewToDo("");
  };
  let updateTodoValue = (event) => {
    setNewToDo(event.target.value);
  };
  let deleteToDo = (id) => {
    setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
  };
  let upperCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodos) => {
        return {
          ...prevTodos,
          isDone: true,
        };
      })
    );
  };
  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) => {
        if (prevTodo.id === id) {
          return {
            ...prevTodo,
            isDone: !prevTodo.isDone,
          };
        } else {
          return prevTodo;
        }
      })
    );
  };
  return (
    <div>
      <input
        id="task"
        placeholder="Enter the task"
        value={newTodo}
        onChange={updateTodoValue}
      ></input>
      &nbsp;
      <button onClick={addNewTask}>Add</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <h4>Tasks to do</h4>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={todo.isDone? {textDecorationLine:"line-through"}:{}}>{todo.task} </span>
            &nbsp;&nbsp;
            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
            &nbsp;
            <button onClick={() => markAsDone(todo.id)}>Mark as Done</button>
            <br /><br />
          </li>
        ))}
      </ol>
      <br />
      <br />
      <button onClick={upperCaseAll}>Mark All as Done</button>
    </div>
  );
}

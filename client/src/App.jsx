// frontend/src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import "./App.css";

const API_URL = "http://localhost:5000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    await axios.post(API_URL, { text });
    setText("");
    fetchTodos();
  };

  const updateTodo = async (id, updatedTask) => {
    await axios.put(`${API_URL}/${id}`, updatedTask);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h2>📝 Todo App</h2>
        <div className="input-section">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

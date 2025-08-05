// backend/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const filePath = "./data.json";

// Read tasks from JSON file
const readTasks = () => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Write tasks to JSON file
const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// GET all todos
app.get("/todos", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST a new todo
app.post("/todos", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT (Update a todo)
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let tasks = readTasks();
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, ...req.body } : task
  );
  writeTasks(tasks);
  res.json({ success: true });
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let tasks = readTasks();
  tasks = tasks.filter((task) => task.id !== id);
  writeTasks(tasks);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

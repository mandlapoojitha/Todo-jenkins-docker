const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
  const todo = { id: Date.now(), text: req.body.text, completed: false };
  todos.push(todo);
  res.status(201).json({ id, text });
});

app.put("/todos/:id", (req, res) => {
  todos = todos.map((todo) =>
    todo.id == req.params.id ? { ...todo, completed: !todo.completed } : todo
  );
  res.json({ success: true });
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((todo) => todo.id != req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

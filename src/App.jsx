import React, { useState, useEffect } from "react";
import { loadTodos, saveTodos, createTodo } from "./utils";
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // load todos from localStorage on first render
  useEffect(() => {
    const stored = loadTodos();
    if (stored.length > 0) {
      setTodos(stored);
    }
  }, []);

  // save todos to localStorage whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // handle input for new todo
  function handleInputChange(e) {
    setNewTodo(e.target.value);
  }

  // add new todo
  function handleAddTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const todo = createTodo(newTodo);
    setTodos([...todos, todo]);
    setNewTodo("");
  }

  // delete todo
  function handleDelete(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  // start editing
  function handleEditClick(todo) {
    setEditingId(todo.id);
    setEditingText(todo.text);
  }

  // save edited todo
  function handleSaveEdit(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: editingText } : t)));
    setEditingId(null);
    setEditingText("");
  }
  function handleToggleComplete(id) {
  // Recommended: functional updater so we always use the latest state
  setTodos(prev =>
    prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
  );
}


  return (
    <div>
      <h1>My To-Do List</h1>

      {/* input field for new todo */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter new todo"
        />
        <button type="submit">Add</button>
      </form>

      {/* render todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={()=>handleToggleComplete(todo.id)}
           />
           <span style={{textDecoration: todo.completed ? "line-through" : "none"}}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  />
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEditClick(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </>
            )}
          </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

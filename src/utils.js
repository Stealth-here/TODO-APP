// localStorage key
const STORAGE_KEY = "todos";

// Load todos from localStorage
export function loadTodos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return []; // nothing stored yet
    return JSON.parse(data); // convert string → array
  } catch (err) {
    console.error("Error loading todos:", err);
    return [];
  }
}

// Save todos to localStorage
export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (err) {
    console.error("Error saving todos:", err);
  }
}

// Create a new todo object
export function createTodo(text) {
  return {
    id: Date.now().toString(), // unique id as string
    text,
    completed: false,
  };
}

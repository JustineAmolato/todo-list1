import { useState, useEffect } from "react";
import TodoList from "./ToDoList";

export default function App() {
const [darkMode, setDarkMode] = useState(() => {
return localStorage.getItem("theme") === "dark";
});

useEffect(() => {
if (darkMode) {
document.body.classList.add("dark-mode");
localStorage.setItem("theme", "dark");
} else {
document.body.classList.remove("dark-mode");
localStorage.setItem("theme", "light");
}
}, [darkMode]);

return (
<div className={`app ${darkMode ? "dark" : ""}`}>
<button onClick={() => setDarkMode(!darkMode)}>
{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
<h1>React TODO App</h1>
<TodoList />
</div>
);
}
import { useState, useEffect } from "react";

export default function TodoList() {
const [tasks, setTasks] = useState([]);
const [task, setTask] = useState("");
const [editIndex, setEditIndex] = useState(null);
const [editText, setEditText] = useState("");
const [filter, setFilter] = useState("all"); // "all", "completed", "pending"

const addTask = () => {
if (task.trim() === "") return;
setTasks([...tasks, { text: task, completed: false }]);
setTask("");
};

const removeTask = (index) => {
setTasks(tasks.filter((_, i) => i !== index));
};

const toggleComplete = (index) => {
setTasks(
tasks.map((t, i) =>
i === index ? { ...t, completed: !t.completed } : t
)
);
};

const startEdit = (index) => {
setEditIndex(index);
setEditText(tasks[index].text);
};

const saveEdit = (index) => {
const updatedTasks = [...tasks];
updatedTasks[index].text = editText;
setTasks(updatedTasks);
setEditIndex(null);
setEditText("");
};

const filteredTasks = tasks.filter((task) => {
if (filter === "completed") return task.completed;
if (filter === "pending") return !task.completed;
return true; // "all"
});

return (
<div>
<h2>To-Do List</h2>
<input
type="text"
placeholder="Add a new task..."
value={task}
onChange={(e) => setTask(e.target.value)}
/>
<button onClick={addTask}>Add Task</button>

<div>
<button onClick={() => setFilter("all")}>All</button>
<button onClick={() => setFilter("completed")}>Completed</button>
<button onClick={() => setFilter("pending")}>Pending</button>
</div>

<ul>
{filteredTasks.map((t, index) => (
<li key={index} style={{ textDecoration: t.completed ? "line-through" : "none" }}>
{editIndex === index ? (
<>
<input
type="text"
value={editText}
onChange={(e) => setEditText(e.target.value)}
/>
<button onClick={() => saveEdit(index)}>Save</button>
</>
) : (
<>
<input
type="checkbox"
checked={t.completed}
onChange={() => toggleComplete(index)}
/>
{t.text}
<button onClick={() => startEdit(index)}>Edit</button>
<button onClick={() => removeTask(index)}>Delete</button>
</>
)}
</li>
))}
</ul>
</div>
);
}
